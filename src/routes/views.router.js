import { Router } from 'express';
import { renderServices, renderAvailability } from '../controllers/views.controller.js';

const router = Router();

// Estas rutas se combinarán más adelante con el prefijo '/views'
router.get('/services', renderServices);
router.get('/availability', renderAvailability);

export default router;