import pool from '../config/db.js';

// GET /api/lands  — public listing
export const getLands = async (req, res) => {
    try {
        const { category, status = 'available', district, search, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const conditions = [];
        const params = [];
        let pIdx = 1;

        if (status) { conditions.push(`status=$${pIdx++}`); params.push(status); }
        if (category) { conditions.push(`category=$${pIdx++}`); params.push(category); }
        if (district) { conditions.push(`district ILIKE $${pIdx++}`); params.push(`%${district}%`); }
        if (search) {
            conditions.push(`(survey_no ILIKE $${pIdx} OR village ILIKE $${pIdx} OR description ILIKE $${pIdx})`);
            params.push(`%${search}%`); pIdx++;
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const totalRes = await pool.query(`SELECT COUNT(*) FROM lands ${where}`, params);
        const lands = await pool.query(
            `SELECT * FROM lands ${where} ORDER BY created_at DESC LIMIT $${pIdx} OFFSET $${pIdx + 1}`,
            [...params, limit, offset]
        );

        res.json({
            success: true,
            total: parseInt(totalRes.rows[0].count),
            page: parseInt(page),
            limit: parseInt(limit),
            lands: lands.rows,
        });
    } catch (err) {
        console.error('getLands:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/lands/:id
export const getLandById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lands WHERE id=$1', [req.params.id]);
        if (!result.rows.length) return res.status(404).json({ success: false, message: 'Land not found' });
        res.json({ success: true, land: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/lands  — admin only
export const createLand = async (req, res) => {
    try {
        const { survey_no, khasra_no, village, tehsil, district, state, area_sqft, category, description, base_rent } = req.body;
        if (!survey_no || !village || !tehsil || !area_sqft || !category || !base_rent) {
            return res.status(400).json({ success: false, message: 'Required fields missing' });
        }
        const result = await pool.query(
            `INSERT INTO lands (survey_no,khasra_no,village,tehsil,district,state,area_sqft,category,description,base_rent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [survey_no, khasra_no, village, tehsil, district || 'Jabalpur', state || 'Madhya Pradesh', area_sqft, category, description, base_rent]
        );
        res.status(201).json({ success: true, land: result.rows[0] });
    } catch (err) {
        console.error('createLand:', err.message);
        if (err.code === '23505') return res.status(409).json({ success: false, message: 'Survey number already exists' });
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// PUT /api/lands/:id  — admin only
export const updateLand = async (req, res) => {
    try {
        const { survey_no, khasra_no, village, tehsil, district, state, area_sqft, category, description, base_rent, status } = req.body;
        const result = await pool.query(
            `UPDATE lands SET
        survey_no=COALESCE($1,survey_no), khasra_no=COALESCE($2,khasra_no),
        village=COALESCE($3,village), tehsil=COALESCE($4,tehsil),
        district=COALESCE($5,district), state=COALESCE($6,state),
        area_sqft=COALESCE($7,area_sqft), category=COALESCE($8,category),
        description=COALESCE($9,description), base_rent=COALESCE($10,base_rent),
        status=COALESCE($11,status), updated_at=NOW()
       WHERE id=$12 RETURNING *`,
            [survey_no, khasra_no, village, tehsil, district, state, area_sqft, category, description, base_rent, status, req.params.id]
        );
        if (!result.rows.length) return res.status(404).json({ success: false, message: 'Land not found' });
        res.json({ success: true, land: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
