//Conexion a base de datos
const db = require('../public/db/conn');
const controller = {};

//Require Funciones
const funcion = require('../public/js/controllerFunctions');
const funcionE = require('../public/js/empleadosFunctions');

// Index GET
controller.index_GET = (req, res) => {
    res.render('index.ejs');

};


controller.crear_equipo_GET = (req, res) => {
    res.render('login.ejs');
};

//Login
controller.login = (req, res) => {
    loginId = req.params.id
    if (loginId == 'verificacion') {
        funcionE.empleadosAccessAll(2, '>=', (err, result) => {

            res.render('login.ejs', {
                data: loginId, data2: result
            });
        });
    } else
        if (loginId == 'crear_equipo') {
            funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                res.render('login.ejs', {
                    data: loginId, data2: result
                });
            });
        } else
            if (loginId == 'movimiento') {
                funcionE.empleadosAccessAll(1, '>=', (err, result) => {

                    res.render('login.ejs', {
                        data: loginId, data2: result
                    });
                });
            } else
                if (loginId == 'modificar') {
                    funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                        res.render('login.ejs', {
                            data: loginId, data2: result
                        });
                    });
                } else
                    if (loginId == 'alta_notificar') {
                        funcionE.empleadosAccessAll(3, '>=', (err, result) => {

                            res.render('login.ejs', {
                                data: loginId, data2: result
                            });
                        });
                    } else
                        if (loginId == 'alta_acceso') {
                            funcionE.empleadosAccessAll(3, '>=', (err, result) => {

                                res.render('login.ejs', {
                                    data: loginId, data2: result
                                });
                            });
                        } else
                            if (loginId == 'reubicar') {
                                funcionE.empleadosAccessAll(1, '>=', (err, result) => {

                                    res.render('login.ejs', {
                                        data: loginId, data2: result
                                    });
                                });
                            } else
                                if (loginId == 'bajas') {
                                    funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                        res.render('login.ejs', {
                                            data: loginId, data2: result
                                        });
                                    });
                                } else if (loginId == 'servicios') {
                                    funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                        res.render('login.ejs', {
                                            data: loginId, data2: result
                                        });
                                    });
                                } else if (loginId == 'ryr') {
                                    funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                        res.render('login.ejs', {
                                            data: loginId, data2: result
                                        });
                                    });
                                } else if (loginId == 'laboratorio') {
                                    funcionE.empleadosAccessAll(2, '>=', (err, result) => {

                                        res.render('login.ejs', {
                                            data: loginId, data2: result
                                        });
                                    });
                                }
}


controller.crear_equipo_POST = (req, res) => {

    numeroEmpleado = req.body.user;

    funcion.controllerAreas((err, result6) => {
        if (err) throw err;
        funcion.controllerTipoEquipo((err, result5) => {
            if (err) throw err;
            funcion.controllerAllEquipo((err, result4) => {
                if (err) throw err;
                funcionE.empleadosNombre(numeroEmpleado, (err, result3) => {
                    if (err) throw err;
                    funcion.controllerPlataforma((err, result1) => {
                        if (err) throw err;
                        funcion.controllerUbicacion((err, result2) => {
                            if (err) throw err;
                            funcion.controllerMAXTR((err, result7) => {
                                if (err) throw err;


                                const next = result7[0].max_value + 1;

                                res.render('crear_equipo.ejs', {
                                    data: result1, data2: result2, data3: result3, data4: numeroEmpleado, data5: result4, data6: result5, data7: result6, next
                                });

                            });

                        });
                    });
                });
            });
        });
    });
};



controller.guardar_equipo_POST = (req, res) => {

    let id = (req.body.id)
    let tipo = (req.body.tipo)
    let plataforma = (req.body.plataforma)
    let descripcion = (req.body.descripcion)
    let periodo = (req.body.periodo)
    let fecha_verificacion = (req.body.fecha_verificacion)
    let ubicacion = 'Sin Ubicacion';
    let periodoryr = req.body.periodoryr;
    let fecha_verificacionryr = req.body.fecha_verificacionryr




    funcion.controllerIdTipo(tipo, (err, result4) => {
        if (err) throw err;

        id_tipo = result4[0].id_tipo;


        if (periodoryr == "") {


            funcion.controllerInsertEquipoN(id, id_tipo, plataforma, descripcion, periodo, ubicacion, fecha_verificacion, (err, result) => {
                if (err) throw err;
            });
        } else {

            funcion.controllerInsertEquipo(id, id_tipo, plataforma, descripcion, periodo, ubicacion, fecha_verificacion, periodoryr, fecha_verificacionryr, (err, result) => {
                if (err) throw err;
            });

        }

        res.render('guardar_equipo.ejs', {
            data: { id, tipo, plataforma, descripcion, periodo, ubicacion, fecha_verificacion }
        });


    });
};



controller.movimiento_POST = (req, res) => {
    numeroEmpleado = req.body.user;
    nuevo = 'false'
    funcionE.empleadosNombre(numeroEmpleado, (err, result5) => {
        if (err) throw err;
        funcion.controllerAllEquipoMov((err, result4) => {
            if (err) throw err;
            funcion.controllerPlataforma((err, result1) => {
                if (err) throw err;
                funcion.controllerUbicacion((err, result2) => {
                    if (err) throw err;
                    funcionE.empleadosAll((err, result3) => {
                        if (err) throw err;

                        res.render('movimiento.ejs', {
                            data: result1, data2: result2, data3: result3, data4: numeroEmpleado, data5: result4, data6: result5, data7: nuevo
                        });

                    });
                });
            });
        });
    });

};

controller.guardar_movimiento_POST = (req, res) => {

    aut_empleado = (req.body.aut_empleado)
    req_empleado = (req.body.req_empleado)
    equipo_id = (req.body.id_equipo)
    accion = (req.body.accion)
    ubicacion = (req.body.ubicacion)
    comentario = (req.body.comentario)

    empleado = req.body.aut_empleado;
    numeroEmpleado = empleado.substring(0, empleado.indexOf(" -"));
    nombre = empleado.substring(empleado.lastIndexOf("-") + 2)
    nuevo = 'true'
    funcion.controllerInsertMovimiento(equipo_id, accion, req_empleado, aut_empleado, ubicacion, comentario, (err, result) => {
        if (err) throw err;

        funcion.controllerUpdateEquipo(equipo_id, ubicacion, (err, result) => {
            if (err) throw err;

            funcion.controllerAllEquipoMov((err, result4) => {
                if (err) throw err;
                funcion.controllerPlataforma((err, result1) => {
                    if (err) throw err;
                    funcion.controllerUbicacion((err, result2) => {
                        if (err) throw err;
                        funcionE.empleadosAll((err, result3) => {
                            if (err) throw err;

                            res.render('movimiento.ejs', {
                                data: result1, data2: result2, data3: result3, data4: numeroEmpleado, data5: result4, data6: nombre, data7: nuevo
                            });

                        });
                    });
                });

            });
        });

    });

};


controller.gages_GET = (req, res) => {

    funcion.controllerTablaGages((err, result) => {
        if (err) throw err;


        res.render('gages.ejs', {
            data: result
        });

    });
};

controller.equipo_GET = (req, res) => {

    funcion.controllerTablaEquipo('!=', 'Baja', (err, result) => {
        if (err) throw err;


        res.render('equipo.ejs', {
            data: result
        });

    });
};

controller.bajas_POST = (req, res) => {

    funcion.controllerTablaEquipo('!=', 'Activo', (err, result) => {
        if (err) throw err;


        res.render('bajas.ejs', {
            data: result
        });

    });
};

controller.activar_POST = (req, res) => {
    idEquipo = req.body.equipo_id3

    funcion.controllerUpdateStatusActivo(idEquipo, (err, result) => {
        if (err) throw err;


        funcion.controllerTablaEquipo('!=', 'Activo', (err, result) => {
            if (err) throw err;


            res.render('bajas.ejs', {
                data: result
            });

        });
    });
};



controller.historial_POST = (req, res) => {

    equipo_id = (req.body.equipo_id2);

    funcion.controllerHistorialEquipo(equipo_id, (err, result) => {
        if (err) throw err;

        res.render('historial.ejs', {
            data: result
        });
    });

};

controller.historial_verificacion_POST = (req, res) => {

    equipo_id = (req.body.equipo_id2);

    funcion.controllerHistorialVerificacion(equipo_id, (err, result) => {
        if (err) throw err;
        funcion.controllerEmpleadosHistorial(equipo_id, (err, result2) => {
            if (err) throw err;

            res.render('historial_verificacion.ejs', {
                data: result, data2: result2
            });
        });
    });
};

controller.verificacion_POST = (req, res) => {
    empleado = req.body.user

    funcionE.empleadosNombre(empleado, (err, result2) => {
        if (err) throw err;

        empleado = empleado + " - " + result2

        funcion.controllerTablaVerificacion((err, result) => {
            if (err) throw err;


            res.render('verificacion.ejs', {
                data: result, data2: empleado, data3: result2
            });

        });
    });
};


controller.laboratorio_POST = (req, res) => {
    numempleado = req.body.user

    funcionE.empleadosNombre(numempleado, (err, result2) => {
        if (err) throw err;

        empleado = numempleado + " - " + result2

        funcion.controllerTablaBitacora((err, result) => {
            if (err) throw err;

            res.render('bitacora_tabla.ejs', {
                data: result, data2: empleado, data3: result2, data3: numempleado
            });

        });
    });
};


controller.guardar_entrega_POST = (req, res) => {
    numempleado = req.body.user

    id = req.body.id
    emp_entrega = req.body.emp_entrega
    fecha = req.body.fecha
    resultado = req.body.resultado
    comentario = req.body.comentario

    funcion.controllerUpdateEntrega(id, emp_entrega, fecha, resultado, comentario, (err, result2) => {
        if (err) throw err;

        funcionE.empleadosNombre(numempleado, (err, result2) => {
            if (err) throw err;

            empleado = numempleado + " - " + result2

            funcion.controllerTablaBitacora((err, result) => {
                if (err) throw err;



                res.render('bitacora_tabla.ejs', {
                    data: result, data2: empleado, data3: result2, data3: numempleado
                });

            });
        });
    });
};

controller.ryr_POST = (req, res) => {
    empleado = req.body.user

    funcionE.empleadosNombre(empleado, (err, result2) => {
        if (err) throw err;

        empleado = empleado + " - " + result2

        funcion.controllerTablaRyR((err, result) => {
            if (err) throw err;


            res.render('ryr.ejs', {
                data: result, data2: empleado, data3: result2
            });

        });
    });
};



controller.servicios_POST = (req, res) => {
    empleado = req.body.user

    funcionE.empleadosNombre(empleado, (err, result2) => {
        if (err) throw err;

        empleado = empleado + " - " + result2

        funcion.controllerTablaServicios((err, result) => {
            if (err) throw err;


            res.render('servicios.ejs', {
                data: result, data2: empleado, data3: result2
            });

        });
    });
};

controller.verificar_POST = (req, res) => {
    equipo = req.body.equipo_id2;
    user = req.body.user;
    fecharyr = req.body.fecharyr
    tipoverificacion = req.body.tipoverificacion

    res.render('verificar.ejs', {
        data: equipo, data2: user, fecha: fecharyr, tipoverificacion
    });


};

controller.guardar_verificacion_POST = (req, res) => {
    emp_id = req.body.user;
    equipo_id = req.body.equipo;
    comentario = req.body.comentario;
    tipo = req.body.tipo;
    tipoverif = req.body.tipoverificacion2
    if (tipo == "Verificacion") {
        columna = "fecha_verificacion"
    } else {
        columna = "fecha_ryr"
    }


    funcion.controllerInsertVerificacion(equipo_id, emp_id, tipo, comentario, (err, result2) => {
        if (err) throw err;

        funcion.controllerUpdateFechaVerificacion(equipo_id, columna, (err, result2) => {
            if (err) throw err;

            funcion.controllerTablaEquipo('=', 'Activo', (err, resultequipo) => {
                if (err) throw err;

                funcion.controllerTablaRyR((err, resultryr) => {
                    if (err) throw err;

                    funcion.controllerTablaServicios((err, resultservicios) => {
                        if (err) throw err;

                        if (tipoverif == "verificacion") {

                            res.render('verificacion.ejs', {
                                data: resultequipo, data2: emp_id, data3: result2
                            });
                        } else if (tipoverif == "ryr") {

                            res.render('ryr.ejs', {
                                data: resultryr, data2: emp_id, data3: result2
                            });
                        } else if (tipoverif == "servicios") {

                            res.render('servicios.ejs', {
                                data: resultservicios, data2: emp_id, data3: result2
                            });
                        }
                    });
                });
            });
        });
    });

};


controller.modificar_POST = (req, res) => {
    empleado = req.body.user

    funcionE.empleadosNombre(empleado, (err, result2) => {
        if (err) throw err;

        empleadoN = req.body.user + ' - ' + result2

        funcion.controllerTablaEquipo('=', 'Activo', (err, result) => {
            if (err) throw err;


            res.render('modificar.ejs', {
                data: result, data2: empleadoN
            });

        });
    });
};

controller.eliminar_equipo_POST = (req, res) => {
    equipo = req.body.equipo_id2;
    user = req.body.user;
    movimiento = req.body.movimiento;

    res.render('eliminar_equipo.ejs', {
        data: equipo, data2: user, data3: movimiento
    });


};



controller.eliminar_equipo__def_POST = (req, res) => {
    equipo = req.body.equipo_id2;
    user = req.body.user;
    movimiento = req.body.movimiento;


    funcion.deleteEquipo(equipo, (err, result3) => {
        if (err) throw err;
        funcion.controllerTablaEquipo('=', 'Activo', (err, result) => {
            if (err) throw err;


            res.render('modificar.ejs', {
                data: result, data2: user
            });
        });
    });



};

controller.guardar_eliminado_POST = (req, res) => {
    emp_id = req.body.user;
    equipo_id = req.body.equipo;
    motivo = req.body.motivo;
    movimiento = req.body.movimiento
    let tipomov
    if (movimiento == "eliminar") {
        tipomov = "Baja"
    } else { tipomov = "Detenido" }


    funcion.controllerInsertBaja(equipo_id, emp_id, motivo, tipomov, (err, result2) => {
        if (err) throw err;

        funcion.controllerUpdateStatus(equipo_id, tipomov, (err, result3) => {
            if (err) throw err;

            funcion.controllerTablaEquipo('=', 'Activo', (err, result) => {
                if (err) throw err;

                res.render('modificar.ejs', {
                    data: result, data2: emp_id
                });
            });
        });
    });

};

controller.modificar_equipo_POST = (req, res) => {

    equipo = req.body.equipo_id2;
    numeroEmpleado = req.body.user;

    funcion.controllerSelectedEquipo(equipo, (err, result6) => {
        if (err) throw err;
        funcion.controllerTipoEquipo((err, result5) => {
            if (err) throw err;

            funcion.controllerPlataforma((err, result1) => {
                if (err) throw err;
                funcion.controllerUbicacion((err, result2) => {
                    if (err) throw err;

                    res.render('modificar_equipo.ejs', {
                        data: result1, data2: result2, data4: numeroEmpleado, data6: result5, data7: equipo, data8: result6
                    });

                });
            });
        });
    });
};

controller.guardar_modificacion_POST = (req, res) => {

    id_equipo = req.body.id
    tipo = req.body.tipo
    periodo = req.body.periodo
    fecha = req.body.fecha_verificacion
    plataforma = req.body.plataforma
    descripcion = req.body.descripcion
    ubicacion = req.body.ubicacion
    periodoryr = req.body.periodoryr
    fecha_verificacionryr = req.body.fecha_verificacionryr



    funcion.controllerIdTipo(tipo, (err, result6) => {
        if (err) throw err;

        if (result6 != '') {
            id_tipo = result6[0].id_tipo;
        } else { id_tipo = '' }


        funcion.controllerUpdateEquipoInfo(id_equipo, id_tipo, periodo, fecha, plataforma, descripcion, ubicacion, periodoryr, fecha_verificacionryr, (err, result6) => {
            if (err) throw err;

            empleado = req.body.user

            funcion.controllerTablaEquipo('=', 'Activo', (err, result) => {
                if (err) throw err;


                res.render('modificar.ejs', {
                    data: result, data2: empleado
                });

            });
        });

    });

};

controller.alta_notificar_POST = (req, res) => {
    numeroEmpleado = req.body.user;

    funcion.controllerTablaNotificar((err, result3) => {
        if (err) throw err;
        funcionE.empleadosTodos((err, result) => {
            if (err) throw err;



            res.render('alta_notificar.ejs', {
                data: result, data2: result3
            });
        });
    });
};

controller.guardar_notificar_POST = (req, res) => {

    correo = req.body.correo;
    esc1 = req.body.esc1
    esc2 = req.body.esc2
    if (esc1 == undefined) {
        esc1 = 0
    }
    if (esc2 == undefined) {
        esc2 = 0
    }

    funcion.controllerSelectNotificar(correo, (err, result0) => {
        if (result0.length < 1) {
            tipo = 0
        } else if (result0[0].tipo == 1) {
            tipo = 2
        }
        funcion.controllerInsertNotificar(correo, esc1, esc2, tipo, (err, result2) => {
            if (err) throw err;
            funcion.controllerTablaNotificar((err, result3) => {
                if (err) throw err;

                funcionE.empleadosTodos((err, result) => {
                    if (err) throw err;

                    res.render('alta_notificar.ejs', {
                        data: result, data2: result3
                    });
                });
            });
        });
    });
};

controller.guardar_notificar_anual_POST = (req, res) => {

    correo = req.body.correo;
    esc1 = req.body.esc1
    esc2 = req.body.esc2
    if (esc1 == undefined) {
        esc1 = 0
    }
    if (esc2 == undefined) {
        esc2 = 0
    }

    funcion.controllerSelectNotificar(correo, (err, result0) => {
        if (result0.length < 1) {
            tipo = 1
        } else if (result0[0].tipo == 0) {
            tipo = 2
        }
        funcion.controllerInsertNotificar(correo, esc1, esc2, tipo, (err, result2) => {
            if (err) throw err;
            funcion.controllerTablaNotificar((err, result3) => {
                if (err) throw err;

                funcionE.empleadosTodos((err, result) => {
                    if (err) throw err;

                    res.render('alta_notificar.ejs', {
                        data: result, data2: result3
                    });
                });
            });
        });
    });
};


controller.eliminar_notificar_POST = (req, res) => {

    correo = req.body.correo2;

    funcion.controllerDeleteNotificar(correo, (err, result2) => {
        if (err) throw err;
        funcion.controllerTablaNotificar((err, result3) => {
            if (err) throw err;

            funcionE.empleadosTodos((err, result) => {
                if (err) throw err;

                res.render('alta_notificar.ejs', {
                    data: result, data2: result3
                });
            });
        });
    });
};

controller.alta_acceso_POST = (req, res) => {
    numeroEmpleado = req.body.user;

    funcionE.empleadosTodosId((err, result) => {
        if (err) throw err;

        funcionE.empleadosAccesos((err, result2) => {
            if (err) throw err;

            funcionE.empleadosAll((err, result3) => {
                if (err) throw err;

                res.render('alta_acceso.ejs', {
                    data: result, data2: result2, data3: result3
                });
            });
        });
    });

};


controller.guardar_acceso_POST = (req, res) => {
    gaffete = req.body.gaffete;
    acceso = req.body.acceso;

    if (acceso == 'Verificacion') {
        acceso = 2;
    } else {
        acceso = 1
    }

    funcionE.empleadosInsertAcceso(gaffete, acceso, (err, result4) => {
        if (err) throw err;
        funcionE.empleadosTodosId((err, result) => {
            if (err) throw err;

            funcionE.empleadosAccesos((err, result2) => {
                if (err) throw err;

                funcionE.empleadosAll((err, result3) => {
                    if (err) throw err;

                    res.render('alta_acceso.ejs', {
                        data: result, data2: result2, data3: result3
                    });
                });
            });
        });
    });
};

controller.delete_acceso_POST = (req, res) => {
    gaffete = req.body.gaffete2;


    funcionE.empleadosDeleteAcceso(gaffete, (err, result3) => {
        if (err) throw err;
        funcionE.empleadosTodosId((err, result) => {
            if (err) throw err;

            funcionE.empleadosAccesos((err, result2) => {
                if (err) throw err;
                funcionE.empleadosAll((err, result4) => {
                    if (err) throw err;

                    res.render('alta_acceso.ejs', {
                        data: result, data2: result2, data3: result4
                    });
                });
            });
        });
    });
};

controller.reubicar_POST = (req, res) => {

    funcion.controllerTablaReubicar((err, result) => {
        if (err) throw err;


        res.render('reubicar.ejs', {
            data: result
        });

    });
};

controller.reubicar_gage_POST = (req, res) => {
    equipo = req.body.equipo_id2;

    funcion.controllerUbicacion((err, result2) => {
        if (err) throw err;
        res.render('reubicar_gage.ejs', {
            data: equipo, data2: result2
        });
    });
};

controller.guardar_reubicar_POST = (req, res) => {

    equipo_id = req.body.gage;
    ubicacion = req.body.ubicacion;

    funcion.controllerUpdateEquipo(equipo_id, ubicacion, (err, result) => {
        if (err) throw err;
        funcion.controllerUpdateReqUbicacion(equipo_id, ubicacion, (err, result) => {
            if (err) throw err;

            funcion.controllerTablaReubicar((err, result) => {
                if (err) throw err;

                res.render('reubicar.ejs', {
                    data: result
                });
            });
        });
    });
};



controller.registrar_prueba_POST = (req, res) => {

    numeroEmpleado = req.body.user;

    funcion.controllerTipoEquipo((err, result5) => {
        if (err) throw err;
        funcion.controllerAllEquipo((err, result4) => {
            if (err) throw err;
            funcionE.empleadosNombre(numeroEmpleado, (err, result3) => {
                if (err) throw err;

                funcionE.empleadosAll((err, result8) => {
                    if (err) throw err;
                    funcion.controllerDepartamentos((err, result9) => {
                        if (err) throw err;
                        funcion.controllerPruebas((err, result10) => {
                            if (err) throw err;



                            res.render('bitacora.ejs', {
                                data3: result3, data4: numeroEmpleado,
                                data5: result4, data6: result5, data8: result8, data9: result9, data10: result10, ventana: "false"
                            });
                        });
                    });
                });
            });
        });
    });


};



controller.revisar_prueba_POST = (req, res) => {
    id = req.body.id
    numeroempleado = req.body.user

    funcion.controllerPrueba(id, (err, result) => {
        if (err) throw err;


        res.render('bitacora_revisar.ejs', {
            data: result[0], numeroempleado
        });
    });

};


controller.entrega_prueba_POST = (req, res) => {
    numeroempleado = req.body.user
    id = req.body.id

    funcion.controllerPrueba(id, (err, result) => {
        if (err) throw err;
        funcionE.empleadosNombre(numeroempleado, (err, result3) => {
            if (err) throw err;

            empleado = numeroempleado + " - " + result3
            res.render('bitacora_entrega.ejs', {
                data: result[0], data2: numeroempleado, empleado
            });
        });
    });
};


controller.guardar_prueba_POST = (req, res) => {

    numeroEmpleado = req.body.user;
    recibe = req.body.emp_recibe
    emp_req = req.body.req_empleado
    fecha = req.body.fecha
    departamento = req.body.departamento
    equipo = req.body.equipo
    prueba = req.body.prueba
    cantidad = req.body.cantidad
    comentario = req.body.comentario


    funcion.controllerInsertPrueba(recibe, emp_req, fecha, departamento, equipo, prueba, cantidad, comentario, (err, result) => {
        if (err) throw err;


        funcion.controllerTipoEquipo((err, result5) => {
            if (err) throw err;
            funcion.controllerAllEquipo((err, result4) => {
                if (err) throw err;
                funcionE.empleadosNombre(numeroEmpleado, (err, result3) => {
                    if (err) throw err;

                    funcionE.empleadosAll((err, result8) => {
                        if (err) throw err;
                        funcion.controllerDepartamentos((err, result9) => {
                            if (err) throw err;
                            funcion.controllerPruebas((err, result10) => {
                                if (err) throw err;

                                res.render('bitacora.ejs', {
                                    data3: result3, data4: numeroEmpleado,
                                    data5: result4, data6: result5, data8: result8, data9: result9, data10: result10, ventana: "true"
                                });
                            });
                        });
                    });
                });
            });
        });
    });

};

controller.delete_prueba_POST = (req, res) => {
    numempleado = req.body.user
    id = req.body.id



    funcion.controllerDeletePrueba(id, (err, r) => {
        if (err) throw err;
        funcionE.empleadosNombre(numempleado, (err, result2) => {
            if (err) throw err;

            empleado = numempleado + " - " + result2

            funcion.controllerTablaBitacora((err, result) => {
                if (err) throw err;

                res.render('bitacora_tabla.ejs', {
                    data: result, data2: empleado, data3: result2, data3: numempleado
                });

            });
        });
    });
};


controller.update_prueba_POST = (req, res) => {
    numempleado = req.body.userid
    id = req.body.idPrueba
    cantidad = req.body.cantidad
    comentario = req.body.comentario_registro


    funcion.controllerUpdatePrueba(id, cantidad, comentario, (err, r) => {
        if (err) throw err;
        funcionE.empleadosNombre(numempleado, (err, result2) => {
            if (err) throw err;

            empleado = numempleado + " - " + result2

            funcion.controllerTablaBitacora((err, result) => {
                if (err) throw err;

                res.render('bitacora_tabla.ejs', {
                    data: result, data2: empleado, data3: result2, data3: numempleado
                });

            });
        });
    });
};




controller.reportes_GET = (req, res) => {

    res.render('reportes.ejs', {

    });
}




controller.tablaEntradas_POST = (req, res) => {

    let desde = req.body.desde
    let hasta = req.body.hasta


    funcion.getMovimientos(desde, hasta, "Entrada")
        .then((result) => { res.json(result) })
        .catch((err) => { console.error(err) })

}

controller.tablaSalidas_POST = (req, res) => {

    let desde = req.body.desde
    let hasta = req.body.hasta


    funcion.getMovimientos(desde, hasta, "Salida")
        .then((result) => { res.json(result) })
        .catch((err) => { console.error(err) })

}


controller.reporteGrafico_POST = (req, res) => {
    desde = req.body.desde
    hasta = req.body.hasta
    funcion.graficaReporte(desde, hasta)
        .then(result => { res.json(result) })
        .catch(err => { console.error(err) })
}

module.exports = controller;