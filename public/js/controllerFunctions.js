const funcion = {};
const express = require('express');
const app = express();
mail_config = require('../email/conn.js');
var mailer = require('express-mailer');
mailer.extend(app, mail_config);
var schedule = require('node-schedule');

const db = require('../db/conn');
const dbE = require('../db/connEmpleados');
const dbA = require('../db/connAreas');

funcion.sendEmail = (dataEmail,tipo) => {

    //Enviar Correos
    if (tipo == "TR") {
        app.mailer.send('email.ejs', {

            //Info General
            to: dataEmail.to,
            cc: dataEmail.cc,
            subject: dataEmail.subject,
            equipos: dataEmail.equipos,
            diasVencer: dataEmail.diasVencer,
            color: dataEmail.color,
            tipos: dataEmail.tipos,
            titulo: dataEmail.titulo
    
        }, function (err) {
            if (err) {
                console.log(err)
                return;
            }
            console.log('mail sent')
        })
    }else{
        app.mailer.send('emailAnual.ejs', {

            //Info General
            to: dataEmail.to,
            cc: dataEmail.cc,
            subject: dataEmail.subject,
            equipos: dataEmail.equipos,
            diasVencer: dataEmail.diasVencer,
            color: dataEmail.color,
            tipos: dataEmail.tipos,
            titulo: dataEmail.titulo
    
        }, function (err) {
            if (err) {
                console.log("EMAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIL"+err)
                return;
            }
            console.log('mail sent')
        })
    }

}



funcion.controllerPlataforma = (callback) => {
    dbA.query(`SELECT * FROM areas_subarea WHERE id_subarea>19`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })

}


funcion.controllerUbicacion = (callback) => {
    db.query(`SELECT * FROM equipo_ubicacion`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })

}


funcion.controllerInsertEquipo = (id, tipo, plataforma, descripcion, periodo, id_ubicacion, fecha, periodoryr, fecha_verificacionryr, callback) => {

    db.query(`
    INSERT INTO equipo_info (equipo_id,equipo_tipo, equipo_plataforma, equipo_descripcion, equipo_periodo, equipo_ubicacion, fecha_verificacion, status, equipo_ryr, fecha_ryr)
    VALUES( '${id}','${tipo}', '${plataforma}','${descripcion}','${periodo}','${id_ubicacion}','${fecha}', 'Activo','${periodoryr}', '${fecha_verificacionryr}')`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertEquipoN = (id, tipo, plataforma, descripcion, periodo, id_ubicacion, fecha, callback) => {

    db.query(`
    INSERT INTO equipo_info (equipo_id,equipo_tipo, equipo_plataforma, equipo_descripcion, equipo_periodo, equipo_ubicacion, fecha_verificacion, status)
    VALUES( '${id}','${tipo}', '${plataforma}','${descripcion}','${periodo}','${id_ubicacion}','${fecha}', 'Activo')`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertMovimiento = (equipo_id, accion, req_empleado, aut_empleado, id_ubicacion, comentario, callback) => {
    db.query(`
    INSERT INTO equipo_req (equipo_id, accion, emp_req, emp_aut, ubicacion, comentario, fecha)
    VALUES( '${equipo_id}', '${accion}','${req_empleado}','${aut_empleado}','${id_ubicacion}','${comentario}', NOW())`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerUpdateEquipo = (id_equipo, id_ubicacion, callback) => {
    db.query(`UPDATE equipo_info SET 
    equipo_ubicacion= "${id_ubicacion}"
    WHERE equipo_id = "${id_equipo}"`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerUpdateReqUbicacion = (id_equipo, ubicacion, callback) => {
    db.query(`UPDATE equipo_req
    SET ubicacion='${ubicacion}'
    WHERE equipo_id='${id_equipo}'
    ORDER BY mov_id DESC
    LIMIT 1`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerUpdateEquipoInfo = (id_equipo, tipo, periodo, fecha, plataforma, descripcion, ubicacion, periodoryr, fecha_ryr, callback) => {
    db.query(`UPDATE equipo_info SET 
    equipo_tipo= IF('${tipo}' != "", '${tipo}', equipo_tipo),
    equipo_periodo= IF('${periodo}' != "", '${periodo}', equipo_periodo),
    fecha_verificacion= IF('${fecha}' != "", '${fecha}', fecha_verificacion),
    equipo_plataforma= IF('${plataforma}' != "", '${plataforma}', equipo_plataforma),
    equipo_descripcion= IF('${descripcion}' != "", '${descripcion}', equipo_descripcion),
    equipo_ubicacion= IF('${ubicacion}' != "", '${ubicacion}', equipo_ubicacion),
    equipo_ryr= IF('${periodoryr}' != "", '${periodoryr}', equipo_ryr),
    fecha_ryr= IF('${fecha_ryr}' != "", '${fecha_ryr}', fecha_ryr)
    WHERE equipo_id="${id_equipo}"
    `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerUpdateStatus = (id_equipo, callback) => {
    db.query(`UPDATE equipo_info SET 
    status= "Baja"
    WHERE equipo_id = "${id_equipo}"`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerUpdateStatusActivo = (id_equipo, callback) => {
    db.query(`UPDATE equipo_info SET 
    status= "Activo"
    WHERE equipo_id = "${id_equipo}"`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerUpdateFechaVerificacion = (id_equipo, columna, callback) => {
    db.query(`UPDATE equipo_info SET 
    ${columna} = NOW()
    WHERE equipo_id = "${id_equipo}"`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerAllEquipo = (callback) => {
    db.query(`SELECT * FROM equipo_info`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}

funcion.controllerAllEquipoMov = (callback) => {
    db.query(`SELECT * FROM equipo_info WHERE status='Activo'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);

        }
    })

}

funcion.controllerSelectedEquipo = (id_equipo, callback) => {
    db.query(`SELECT * FROM equipo_info, equipo_tipo
    WHERE (equipo_info.equipo_tipo = equipo_tipo.id_tipo)
    AND equipo_id="${id_equipo}"
    ORDER BY equipo_id DESC`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerTablaGages = (callback) => {
    db.query(`SELECT * FROM equipo_info
    WHERE (equipo_tipo=20)
    AND status='Activo' AND equipo_ubicacion != 'Mezzanine' AND equipo_ubicacion NOT LIKE '%MZE%'
    ORDER BY equipo_id DESC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerTablaReubicar = (callback) => {
    db.query(`SELECT * FROM equipo_info
    WHERE (equipo_tipo=20)
    AND status='Activo'
    AND equipo_ubicacion=''
    ORDER BY equipo_id DESC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerTablaEquipo = (status, callback) => {
    db.query(`SELECT * FROM equipo_info,  equipo_tipo
    WHERE (equipo_info.equipo_tipo = equipo_tipo.id_tipo) AND equipo_ubicacion != 'Mezzanine' AND equipo_ubicacion NOT LIKE '%MZE%'
    AND status='${status}'
    ORDER BY equipo_id`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerTablaVerificacion = (callback) => {
    db.query(`SELECT * FROM equipo_info,  equipo_tipo
    WHERE (equipo_info.equipo_tipo = equipo_tipo.id_tipo) AND equipo_ubicacion != 'Mezzanine' AND equipo_ubicacion NOT LIKE '%MZE%'
    AND status='Activo'
    ORDER BY equipo_id DESC`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerTablaRyR = (callback) => {
    db.query(`SELECT * FROM equipo_info,  equipo_tipo
    WHERE (equipo_info.equipo_tipo = equipo_tipo.id_tipo) AND equipo_ubicacion != 'Mezzanine' AND equipo_ubicacion NOT LIKE '%MZE%'
    AND equipo_ryr != 'NULL' AND status='Activo' ORDER BY equipo_id DESC`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}


funcion.controllerTablaServicios = (callback) => {
    db.query(`SELECT * FROM equipo_info,  equipo_tipo
    WHERE (equipo_info.equipo_tipo = equipo_tipo.id_tipo) 
    AND (equipo_info.status='Activo') AND (equipo_info.equipo_ubicacion = 'Mezzanine' OR equipo_info.equipo_ubicacion LIKE '%MZE%')
    ORDER BY equipo_info.equipo_id DESC`, function (err, result, fields) {

        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}



funcion.controllerHistorialEquipo = (equipoid, callback) => {

    db.query(`SELECT * FROM equipo_req WHERE equipo_id = '${equipoid}' ORDER BY fecha DESC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerHistorialVerificacion = (equipoid, callback) => {

    db.query(`SELECT * FROM equipo_verificacion WHERE equipo_id = '${equipoid}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.controllerEmpleadosHistorial = (equipoid, callback) => {
    let nombres = [];
    db.query(`SELECT emp_req FROM equipo_req WHERE equipo_id = '${equipoid}'`, function (err, result, fields) {

        for (let i = 0; i < result.length; i++) {

            dbE.query(`SELECT emp_nombre FROM del_empleados WHERE emp_id= '${result[i].emp_req}'`, function (err, result2, fields) {

                nombres.push(result2[0].emp_nombre)
            })

        }
        if (err) {
            callback(err, null);
        } else {

            callback(null, nombres);
        }
    })


}

funcion.controllerInsertVerificacion = (equipo_id, emp_id, tipo, comentario, callback) => {
    db.query(`
    INSERT INTO equipo_verificacion (equipo_id, emp_id,tipo, comentario, fecha)
    VALUES( '${equipo_id}', '${emp_id}','${tipo}','${comentario}', NOW())`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertNotificar = (correo, esc1, esc2, tipo, callback) => {
    db.query(`
    INSERT INTO equipo_notificar (correo, esc1, esc2, tipo)
    VALUES( '${correo}',${esc1},${esc2},${tipo})
    ON DUPLICATE KEY UPDATE tipo = ${tipo}
    `, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerTablaNotificar = (callback) => {

    db.query(`SELECT * FROM equipo_notificar`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerInsertBaja = (equipo_id, emp_id, motivo, callback) => {
    db.query(`
    INSERT INTO equipo_req (equipo_id, accion, emp_req, emp_aut, ubicacion, comentario, fecha)
    VALUES( '${equipo_id}', 'Baja','','${emp_id}','','${motivo}', NOW())`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.controllerTipoEquipo = (callback) => {

    db.query(`SELECT * FROM equipo_tipo`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerIdTipo = (tipo, callback) => {

    db.query(`SELECT id_tipo FROM equipo_tipo WHERE tipo='${tipo}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerAreas = (callback) => {

    dbA.query(`SELECT * FROM areas_subarea`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerSelectNotificar = (correo, callback) => {

    db.query(`SELECT * FROM equipo_notificar WHERE correo='${correo}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcion.controllerDeleteNotificar = (correo, callback) => {

    db.query(`DELETE FROM equipo_notificar WHERE correo='${correo}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}


funcion.sendNotificacion = (esc, color, dmax, dmin, titulo, tipo) => {
    let equipos = [];
    let diasVencer = [];
    let tipos = [];



    db.query(`SELECT * FROM equipo_info, equipo_tipo 
    WHERE (equipo_info.equipo_tipo = equipo_tipo.id_tipo)
    AND status='Activo'`, function (err, result, fields) {
        if (err) {
            console.log(err)
        } else {

            if (result.length > 0) {


                for (let i = 0; i < result.length; i++) {
                    let fechaUltima
                    if (tipo == "verificacion") {
                        fechaUltima = result[i].fecha_verificacion;

                        let hoy = new Date();
                        let fechaSiguiente = new Date(fechaUltima.setMonth(fechaUltima.getMonth() + result[i].equipo_periodo));

                        let seconds = (fechaSiguiente.getTime() - hoy.getTime()) / 1000;
                        let minutos = (seconds / 60);
                        let horas = (minutos / 60);
                        let dias = Math.round((horas / 24));

                        if (dias <= dmax && dias > dmin) {
                            equipos.push(result[i].equipo_id)
                            diasVencer.push(dias);
                            tipos.push(result[i].tipo)
                        }


                    } else {
                        if (result[i].fecha_ryr != null) {
                            fechaUltima = result[i].fecha_ryr;

                            let hoy = new Date();
                            let fechaSiguiente = new Date(fechaUltima.setMonth(fechaUltima.getMonth() + result[i].equipo_periodo));

                            let seconds = (fechaSiguiente.getTime() - hoy.getTime()) / 1000;
                            let minutos = (seconds / 60);
                            let horas = (minutos / 60);
                            let dias = Math.round((horas / 24));

                            if (dias <= dmax && dias > dmin) {
                                equipos.push(result[i].equipo_id)
                                diasVencer.push(dias);
                                tipos.push(result[i].tipo)
                            }
                        }

                    }


                }


                if (equipos.length > 0) {

                    db.query(`SELECT correo FROM equipo_notificar WHERE esc${esc}=1`, function (err, resultc, fields) {


                        for (let i = 0; i < resultc.length; i++) {

                            to = resultc[i].correo;
                            cc = '';
                            subject = 'Sistema de Inventario de Calidad -' + titulo + ' a Vencer-';
                            equipos = equipos;
                            diasVencer = diasVencer;
                            color = color;
                            tipos = tipos;

                            dataEmail = {
                                to, cc, subject, equipos, diasVencer, color, tipos, titulo
                            }

                            funcion.sendEmail(dataEmail,"TR");

                        }
                    })
                }
            }
        }
    })
}


funcion.sendAnualNotificacion = (color, dmax, dmin,titulo) => {
    let equipos = [];
    let diasVencer = [];
    let tipos = [];

    db.query(`SELECT * FROM equipo_info 
    WHERE (equipo_info.equipo_id LIKE '%ANUAL%')
    AND status='Activo'`, function (err, result, fields) {
        if (err) {
            throw(err)
        } else {
            if (result.length > 0) {


                for (let i = 0; i < result.length; i++) {
                    fechaUltima = result[i].fecha_verificacion;

                    let hoy = new Date();
                    let fechaSiguiente = new Date(fechaUltima.setMonth(fechaUltima.getMonth() + result[i].equipo_periodo));

                    let seconds = (fechaSiguiente.getTime() - hoy.getTime()) / 1000;
                    let minutos = (seconds / 60);
                    let horas = (minutos / 60);
                    let dias = Math.round((horas / 24));

                    if (dias <= dmax && dias > dmin) {
                        equipos.push(result[i].equipo_id)
                        diasVencer.push(dias);
                        tipos.push(result[i].tipo)
                    }
                }
    
                if (equipos.length > 0) {
                    db.query(`SELECT correo FROM equipo_notificar WHERE tipo=>1`, function (err, resultc, fields) {

     
                        for (let i = 0; i < resultc.length; i++) {

                            to = resultc[i].correo;
                            cc = '';
                            subject = 'Recordatorio Anual de Calendario de Auditoria de Producto';
                            equipos = equipos;
                            diasVencer = diasVencer;
                            color = color;
                            tipos = tipos;

                            dataEmail = {
                                to, cc, subject, equipos, diasVencer, color, tipos, titulo
                            }
                            funcion.sendEmail(dataEmail,"Anual");
                        }
                    })
                }
            }
        }
    })
}

//Enviar correos cada determinado tiempo
var rule = new schedule.RecurrenceRule();
//rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = 6;
rule.minute = 0;
rule.second = 0;

schedule.scheduleJob(rule, function () {

    funcion.sendNotificacion(1, '#f0ad4e', 15, 10, "Verificaciones", "verificacion");
    funcion.sendNotificacion(2, '#d9534f', 10, -1000, "Verificaciones", "verificacion");
    funcion.sendNotificacion(1, '#f0ad4e', 15, 10, "Estudios R&R", "ryr");
    funcion.sendNotificacion(2, '#d9534f', 10, -1000, "Estudios R&R", "ryr");
    funcion.sendAnualNotificacion( '#d9534f', 10, -1000, "Recordatorio Anual");


});




var rule2 = new schedule.RecurrenceRule();
//rule.dayOfWeek = [new schedule.Range(1, 5)];
//rule2.hour = 6;
//rule2.minute = 0;
rule2.second = 1;

schedule.scheduleJob(rule2, function () {

    funcion.sendNotificacion(2, '#d9534f', 10, -1000, "Verificaciones", "verificacion");



});



module.exports = funcion;