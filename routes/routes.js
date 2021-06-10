const express = require('express');
const router = express.Router();
const routesController = require('./routesController')

//Routes

router.get('/', routesController.index_GET);
router.get('/login/:id', routesController.login);
router.get('/crear_equipo/login', routesController.crear_equipo_GET);
router.post('/crear_equipo', routesController.crear_equipo_POST);
router.post('/guardar_equipo', routesController.guardar_equipo_POST);
router.post('/verificacion', routesController.verificacion_POST);
router.post('/servicios', routesController.servicios_POST);
router.post('/ryr', routesController.ryr_POST);
router.post('/movimiento', routesController.movimiento_POST);
router.post('/guardar_movimiento', routesController.guardar_movimiento_POST);
router.post('/historial', routesController.historial_POST);
router.post('/historial_verificacion', routesController.historial_verificacion_POST);
router.post('/modificar', routesController.modificar_POST);
router.get('/gages', routesController.gages_GET);
router.post('/verificar', routesController.verificar_POST);
router.post('/guardar_verificacion', routesController.guardar_verificacion_POST);
router.get('/equipo', routesController.equipo_GET);
router.post('/eliminar_equipo', routesController.eliminar_equipo_POST);
router.post('/guardar_eliminado', routesController.guardar_eliminado_POST);
router.post('/modificar_equipo', routesController.modificar_equipo_POST);
router.post('/guardar_modificacion', routesController.guardar_modificacion_POST);
router.post('/alta_notificar', routesController.alta_notificar_POST);
router.post('/guardar_notificar', routesController.guardar_notificar_POST);
router.post('/guardar_notificar_anual', routesController.guardar_notificar_anual_POST);
router.post('/eliminar_notificar', routesController.eliminar_notificar_POST);
router.post('/bajas', routesController.bajas_POST);
router.post('/alta_acceso', routesController.alta_acceso_POST);
router.post('/guardar_acceso', routesController.guardar_acceso_POST);
router.post('/delete_acceso', routesController.delete_acceso_POST);
router.post('/reubicar', routesController.reubicar_POST);
router.post('/reubicar_gage', routesController.reubicar_gage_POST);
router.post('/guardar_reubicar', routesController.guardar_reubicar_POST);
router.post('/activar', routesController.activar_POST);
router.post('/laboratorio', routesController.laboratorio_POST);
router.post('/guardar_prueba', routesController.guardar_prueba_POST);
router.post('/registrar_prueba', routesController.registrar_prueba_POST);
router.post('/revisar_prueba', routesController.revisar_prueba_POST);
router.post('/entrega_prueba', routesController.entrega_prueba_POST);
router.post('/guardar_entrega', routesController.guardar_entrega_POST);
router.post('/delete_prueba', routesController.delete_prueba_POST);
router.post('/update_prueba', routesController.update_prueba_POST);
router.get('/reporte', routesController.reportes_GET);

router.post('/tablaEntradas/', routesController.tablaEntradas_POST);
router.post('/tablaSalidas/', routesController.tablaSalidas_POST);
router.post('/reporteGrafico/', routesController.reporteGrafico_POST);

router.get('*', (req, res) => {
  res.send('404 Page not found');
});

module.exports = router;

