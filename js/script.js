/**
 * Utils: Manejo de formato, validaciones estrictas, seguridad y DOM.
 */
class Utils {
    // Prevención de ataques XSS (Inyección de HTML/Scripts)
    static escapeHTML(str) {
        if (typeof str !== 'string') return str;
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
    }

    static parseInput(id, allowNegative = false, requireInteger = false) {
        const input = document.getElementById(id);
        if (!input) return null;
        Utils.clearError(input);
        
        const res = Utils.validateValue(input.value, allowNegative, requireInteger);
        if (!res.valid) {
            Utils.showError(input, res.msg);
            return null;
        }
        return res.num;
    }

    static validateValue(valStr, allowNegative = false, requireInteger = false) {
        if (typeof valStr !== 'string') return { valid: false, msg: 'Campo inválido' };
        let val = valStr.trim().replace(',', '.');
        if (val === '') return { valid: false, msg: 'Campo requerido' };
        
        const regex = allowNegative ? /^-?\d+(\.\d+)?$/ : /^\d+(\.\d+)?$/;
        if (!regex.test(val)) {
            return { valid: false, msg: requireInteger ? 'Debe ser entero' : 'Número no válido' };
        }
        
        let num = parseFloat(val);
        if (!isFinite(num)) return { valid: false, msg: 'Número excesivo' };
        
        if (requireInteger && !Number.isInteger(num)) {
            return { valid: false, msg: 'Debe ser entero' };
        }
        
        if (!allowNegative && num < 0) {
            return { valid: false, msg: 'No admite negativos' };
        }
        
        return { valid: true, num: num };
    }

    static showError(input, message) {
        if (!input) return;
        input.classList.add('input-error');
        let errorSpan = input.parentElement.querySelector('.error-message');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            input.parentElement.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    }

    static clearError(input) {
        if (!input) return;
        input.classList.remove('input-error');
        let errorSpan = input.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.remove();
        }
    }

    static clearAllFields(ids) {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.value = '';
                Utils.clearError(el);
            }
        });
    }

    static formatCurrency(amount) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
    }

    static formatNumber(amount) {
        return amount.toFixed(2);
    }

    static generarTablaHTML(cabeceras) {
        let ths = cabeceras.map(c => `<th>${c}</th>`).join('');
        return `
            <div class="resultados-container fade-in" style="margin-top: 30px;">
                <h3 class="titulo-resultados">Historial de Resultados</h3>
                <table class="tabla-historial" style="width: 100%; border-collapse: collapse;">
                    <thead><tr>${ths}</tr></thead>
                    <tbody id="historial-body"></tbody>
                </table>
            </div>
        `;
    }

    static agregarFila(valoresArray) {
        const tbody = document.getElementById('historial-body');
        if (!tbody) return;
        const tr = document.createElement('tr');
        tr.className = 'fade-in';
        valoresArray.forEach(val => {
            const td = document.createElement('td');
            td.innerHTML = val; 
            tr.appendChild(td);
        });
        tbody.insertBefore(tr, tbody.firstChild);
    }
}

/**
 * SecuencialesController: Módulo 1 (10 ejercicios)
 */
class SecuencialesController {
    static render(id, area) {
        let html = '';
        switch(id) {
            case 'sec1':
                html = `
                    <h2 class="titulo-ejercicio">1. Suma de dos números</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Número 1:</label><input type="text" id="n1"></div>
                        <div class="grupo-input"><label>Número 2:</label><input type="text" id="n2"></div>
                        <button class="btn-ejecutar" id="btn-accion">Sumar</button>
                    </div>
                    ${Utils.generarTablaHTML(['N1', 'N2', 'Resultado'])}
                `;
                break;
            case 'sec2':
                html = `
                    <h2 class="titulo-ejercicio">2. Área de un rectángulo</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Base:</label><input type="text" id="base"></div>
                        <div class="grupo-input"><label>Altura:</label><input type="text" id="altura"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular Área</button>
                    </div>
                    ${Utils.generarTablaHTML(['Base', 'Altura', 'Área'])}
                `;
                break;
            case 'sec3':
                html = `
                    <h2 class="titulo-ejercicio">3. Nota definitiva UniEspinal</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Nota 1 (30%):</label><input type="text" id="n1"></div>
                        <div class="grupo-input"><label>Nota 2 (30%):</label><input type="text" id="n2"></div>
                        <div class="grupo-input"><label>Nota 3 (40%):</label><input type="text" id="n3"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular Nota</button>
                    </div>
                    ${Utils.generarTablaHTML(['N1', 'N2', 'N3', 'Definitiva'])}
                `;
                break;
            case 'sec4':
                html = `
                    <h2 class="titulo-ejercicio">4. Área de una circunferencia</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Radio (R):</label><input type="text" id="radio"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular</button>
                    </div>
                    ${Utils.generarTablaHTML(['Radio', 'Área'])}
                `;
                break;
            case 'sec5':
                html = `
                    <h2 class="titulo-ejercicio">5. Área terreno irregular (Forma A)</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>A (Altura total):</label><input type="text" id="a"></div>
                        <div class="grupo-input"><label>B (Base):</label><input type="text" id="b"></div>
                        <div class="grupo-input"><label>C (Altura rect):</label><input type="text" id="c"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular Área</button>
                    </div>
                    ${Utils.generarTablaHTML(['A', 'B', 'C', 'Área Total'])}
                `;
                break;
            case 'sec6':
                html = `
                    <h2 class="titulo-ejercicio">6. Área terreno tipo gota</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Hipotenusa (H):</label><input type="text" id="h"></div>
                        <div class="grupo-input"><label>Radio (R):</label><input type="text" id="r"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular Área</button>
                    </div>
                    ${Utils.generarTablaHTML(['H', 'R', 'Cateto', 'Área Total'])}
                `;
                break;
            case 'sec7':
                html = `
                    <h2 class="titulo-ejercicio">7. Producción de leche</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Litros producidos:</label><input type="text" id="litros"></div>
                        <div class="grupo-input"><label>Precio x Galón:</label><input type="text" id="precio"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular Ganancia</button>
                    </div>
                    ${Utils.generarTablaHTML(['Litros', 'Galones', 'Precio por Galón', 'Ganancia Total'])}
                `;
                break;
            case 'sec8':
                html = `
                    <h2 class="titulo-ejercicio">8. Distancia entre dos puntos</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>X1:</label><input type="text" id="x1" class="input-corto"></div>
                        <div class="grupo-input"><label>Y1:</label><input type="text" id="y1" class="input-corto"></div>
                        <div class="grupo-input"><label>X2:</label><input type="text" id="x2" class="input-corto"></div>
                        <div class="grupo-input"><label>Y2:</label><input type="text" id="y2" class="input-corto"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular D</button>
                    </div>
                    ${Utils.generarTablaHTML(['Punto 1', 'Punto 2', 'Distancia'])}
                `;
                break;
            case 'sec9':
                html = `
                    <h2 class="titulo-ejercicio">9. Conversión Metros a Pulgadas</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Metros (m):</label><input type="text" id="metros"></div>
                        <button class="btn-ejecutar" id="btn-accion">Convertir</button>
                    </div>
                    ${Utils.generarTablaHTML(['Metros', 'Pulgadas'])}
                `;
                break;
            case 'sec10':
                html = `
                    <h2 class="titulo-ejercicio">10. Llenado de alberca</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Largo (m):</label><input type="text" id="l" class="input-corto"></div>
                        <div class="grupo-input"><label>Ancho (m):</label><input type="text" id="a" class="input-corto"></div>
                        <div class="grupo-input"><label>Alto (m):</label><input type="text" id="h" class="input-corto"></div>
                        <div class="grupo-input"><label>Cantidad:</label><input type="text" id="cant" class="input-corto"></div>
                        <div class="grupo-input"><label>Costo $ / m³:</label><input type="text" id="costo"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular Pago</button>
                    </div>
                    ${Utils.generarTablaHTML(['Medidas', 'Cantidad', 'Volumen Total', 'Total a Pagar'])}
                `;
                break;
        }

        area.innerHTML = html;
        const btn = document.getElementById('btn-accion');
        if (btn) btn.addEventListener('click', () => this.ejecutar(id));
    }

    static ejecutar(id) {
        switch(id) {
            case 'sec1': {
                let n1 = Utils.parseInput('n1', true);
                let n2 = Utils.parseInput('n2', true);
                if (n1 === null || n2 === null) return;
                Utils.agregarFila([n1, n2, Utils.formatNumber(n1 + n2)]);
                Utils.clearAllFields(['n1', 'n2']);
                break;
            }
            case 'sec2': {
                let b = Utils.parseInput('base');
                let h = Utils.parseInput('altura');
                if (b === null || h === null) return;
                if (b <= 0 || h <= 0) {
                    if (b <= 0) Utils.showError(document.getElementById('base'), 'Debe ser > 0');
                    if (h <= 0) Utils.showError(document.getElementById('altura'), 'Debe ser > 0');
                    return;
                }
                Utils.agregarFila([b, h, Utils.formatNumber(b * h)]);
                Utils.clearAllFields(['base', 'altura']);
                break;
            }
            case 'sec3': {
                let n1 = Utils.parseInput('n1');
                let n2 = Utils.parseInput('n2');
                let n3 = Utils.parseInput('n3');
                if (n1 === null || n2 === null || n3 === null) return;
                let hasError = false;
                if (n1 > 5) { Utils.showError(document.getElementById('n1'), 'Nota máx 5.0'); hasError = true; }
                if (n2 > 5) { Utils.showError(document.getElementById('n2'), 'Nota máx 5.0'); hasError = true; }
                if (n3 > 5) { Utils.showError(document.getElementById('n3'), 'Nota máx 5.0'); hasError = true; }
                if (hasError) return;
                let def = (n1 * 0.3) + (n2 * 0.3) + (n3 * 0.4);
                Utils.agregarFila([n1, n2, n3, Utils.formatNumber(def)]);
                Utils.clearAllFields(['n1', 'n2', 'n3']);
                break;
            }
            case 'sec4': {
                let r = Utils.parseInput('radio');
                if (r === null) return;
                if (r <= 0) {
                    Utils.showError(document.getElementById('radio'), 'Radio debe ser > 0');
                    return;
                }
                let area = Math.PI * Math.pow(r, 2);
                Utils.agregarFila([r, Utils.formatNumber(area)]);
                Utils.clearAllFields(['radio']);
                break;
            }
            case 'sec5': {
                let a = Utils.parseInput('a');
                let b = Utils.parseInput('b');
                let c = Utils.parseInput('c');
                if (a === null || b === null || c === null) return;
                if (a <= c) {
                    Utils.showError(document.getElementById('a'), 'A debe ser > C');
                    return;
                }
                let areaTri = (b * (a - c)) / 2;
                let areaRect = b * c;
                Utils.agregarFila([a, b, c, Utils.formatNumber(areaTri + areaRect)]);
                Utils.clearAllFields(['a', 'b', 'c']);
                break;
            }
            case 'sec6': {
                let h = Utils.parseInput('h');
                let r = Utils.parseInput('r');
                if (h === null || r === null) return;
                if (h <= r) {
                    Utils.showError(document.getElementById('h'), 'H debe ser > R');
                    return;
                }
                let cateto = Math.sqrt(Math.pow(h, 2) - Math.pow(r, 2));
                let areaTri = r * cateto;
                let areaSemi = (Math.PI * Math.pow(r, 2)) / 2;
                Utils.agregarFila([h, r, Utils.formatNumber(cateto), Utils.formatNumber(areaTri + areaSemi)]);
                Utils.clearAllFields(['h', 'r']);
                break;
            }
            case 'sec7': {
                let litros = Utils.parseInput('litros');
                let precio = Utils.parseInput('precio');
                if (litros === null || precio === null) return;
                let galones = litros / 3.785;
                Utils.agregarFila([litros, Utils.formatNumber(galones), Utils.formatCurrency(precio), Utils.formatCurrency(galones * precio)]);
                Utils.clearAllFields(['litros', 'precio']);
                break;
            }
            case 'sec8': {
                let x1 = Utils.parseInput('x1', true);
                let y1 = Utils.parseInput('y1', true);
                let x2 = Utils.parseInput('x2', true);
                let y2 = Utils.parseInput('y2', true);
                if (x1 === null || y1 === null || x2 === null || y2 === null) return;
                let dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                Utils.agregarFila([`(${x1}, ${y1})`, `(${x2}, ${y2})`, Utils.formatNumber(dist)]);
                Utils.clearAllFields(['x1', 'y1', 'x2', 'y2']);
                break;
            }
            case 'sec9': {
                let m = Utils.parseInput('metros');
                if (m === null) return;
                Utils.agregarFila([m, Utils.formatNumber(m / 0.0254)]);
                Utils.clearAllFields(['metros']);
                break;
            }
            case 'sec10': {
                let l = Utils.parseInput('l');
                let a = Utils.parseInput('a');
                let h = Utils.parseInput('h');
                let cant = Utils.parseInput('cant', false, true);
                let costo = Utils.parseInput('costo');
                if (l === null || a === null || h === null || cant === null || costo === null) return;
                let volTotal = l * a * h * cant;
                Utils.agregarFila([`${l}x${a}x${h}`, cant, Utils.formatNumber(volTotal), Utils.formatCurrency(volTotal * costo)]);
                Utils.clearAllFields(['l', 'a', 'h', 'cant', 'costo']);
                break;
            }
        }
    }
}

/**
 * CondicionalesController: Módulo 2 (7 ejercicios)
 */
class CondicionalesController {
    static render(id, area) {
        let html = '';
        switch(id) {
            case 'cond1':
                html = `
                    <h2 class="titulo-ejercicio">1. Mayor de dos números</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>A:</label><input type="text" id="a"></div>
                        <div class="grupo-input"><label>B:</label><input type="text" id="b"></div>
                        <button class="btn-ejecutar" id="btn-accion">Comparar</button>
                    </div>
                    ${Utils.generarTablaHTML(['A', 'B', 'Resultado'])}
                `;
                break;
            case 'cond2':
                html = `
                    <h2 class="titulo-ejercicio">2. Positivo, Negativo o Cero</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Número:</label><input type="text" id="num"></div>
                        <button class="btn-ejecutar" id="btn-accion">Evaluar</button>
                    </div>
                    ${Utils.generarTablaHTML(['Número', 'Clasificación'])}
                `;
                break;
            case 'cond3':
                html = `
                    <h2 class="titulo-ejercicio">3. Venta de Lápices</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Cantidad Lápices:</label><input type="text" id="cant"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular Pago</button>
                    </div>
                    ${Utils.generarTablaHTML(['Cantidad', 'Precio Unitario', 'Total'])}
                `;
                break;
            case 'cond4':
                html = `
                    <h2 class="titulo-ejercicio">4. Almacenes Pepita</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Precio del traje:</label><input type="text" id="precio"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular Descuento</button>
                    </div>
                    ${Utils.generarTablaHTML(['Precio Base', 'Porcentaje Descuento', 'Monto Descuento', 'Precio Final'])}
                `;
                break;
            case 'cond5':
                html = `
                    <h2 class="titulo-ejercicio">5. Mayor de tres números</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>N1:</label><input type="text" id="n1" class="input-corto"></div>
                        <div class="grupo-input"><label>N2:</label><input type="text" id="n2" class="input-corto"></div>
                        <div class="grupo-input"><label>N3:</label><input type="text" id="n3" class="input-corto"></div>
                        <button class="btn-ejecutar" id="btn-accion">Analizar</button>
                    </div>
                    ${Utils.generarTablaHTML(['Números Involucrados', 'Número Mayor', 'Orden Descendente'])}
                `;
                break;
            case 'cond6':
                html = `
                    <h2 class="titulo-ejercicio">6. Presupuesto La Parrillada</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Personas:</label><input type="text" id="personas"></div>
                        <button class="btn-ejecutar" id="btn-accion">Presupuestar</button>
                    </div>
                    ${Utils.generarTablaHTML(['Personas', 'Tarifa Plato', 'Total'])}
                `;
                break;
            case 'cond7':
                html = `
                    <h2 class="titulo-ejercicio">7. Citas Ginecólogo Vergara</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Número de cita:</label><input type="text" id="cita"></div>
                        <button class="btn-ejecutar" id="btn-accion">Calcular</button>
                    </div>
                    ${Utils.generarTablaHTML(['Número de Cita', 'Costo de la Cita', 'Total Acumulado'])}
                `;
                break;
        }

        area.innerHTML = html;
        const btn = document.getElementById('btn-accion');
        if (btn) btn.addEventListener('click', () => this.ejecutar(id));
    }

    static ejecutar(id) {
        switch(id) {
            case 'cond1': {
                let a = Utils.parseInput('a', true);
                let b = Utils.parseInput('b', true);
                if (a === null || b === null) return;
                let res = (a > b) ? 'A es mayor' : (b > a) ? 'B es mayor' : 'Son iguales';
                Utils.agregarFila([a, b, res]);
                Utils.clearAllFields(['a', 'b']);
                break;
            }
            case 'cond2': {
                let num = Utils.parseInput('num', true);
                if (num === null) return;
                let res = (num > 0) ? 'Positivo' : (num < 0) ? 'Negativo' : 'Cero';
                Utils.agregarFila([num, res]);
                Utils.clearAllFields(['num']);
                break;
            }
            case 'cond3': {
                let cant = Utils.parseInput('cant', false, true);
                if (cant === null) return;
                if (cant <= 0) {
                    Utils.showError(document.getElementById('cant'), 'Debe ser mayor a 0');
                    return;
                }
                let precio = (cant >= 1000) ? 1100 : 1300;
                Utils.agregarFila([cant, Utils.formatCurrency(precio), Utils.formatCurrency(cant * precio)]);
                Utils.clearAllFields(['cant']);
                break;
            }
            case 'cond4': {
                let precio = Utils.parseInput('precio');
                if (precio === null) return;
                let pct = (precio > 25000) ? 0.17 : 0.05;
                let desc = precio * pct;
                Utils.agregarFila([Utils.formatCurrency(precio), (pct*100)+'%', Utils.formatCurrency(desc), Utils.formatCurrency(precio - desc)]);
                Utils.clearAllFields(['precio']);
                break;
            }
            case 'cond5': {
                let n1 = Utils.parseInput('n1', true);
                let n2 = Utils.parseInput('n2', true);
                let n3 = Utils.parseInput('n3', true);
                if (n1 === null || n2 === null || n3 === null) return;
                let arr = [n1, n2, n3];
                arr.sort((x, y) => y - x);
                Utils.agregarFila([`${n1}, ${n2}, ${n3}`, arr[0], arr.join(' es mayor que ')]);
                Utils.clearAllFields(['n1', 'n2', 'n3']);
                break;
            }
            case 'cond6': {
                let p = Utils.parseInput('personas', false, true);
                if (p === null) return;
                if (p <= 0) {
                    Utils.showError(document.getElementById('personas'), 'Debe ser mayor a 0');
                    return;
                }
                if (p > 100000) {
                    Utils.showError(document.getElementById('personas'), 'Máx 100.000 personas');
                    return;
                }
                let tarifa = 10000;
                if (p > 150) tarifa = 7500;
                else if (p > 90) tarifa = 8500;
                Utils.agregarFila([p, Utils.formatCurrency(tarifa), Utils.formatCurrency(p * tarifa)]);
                Utils.clearAllFields(['personas']);
                break;
            }
            case 'cond7': {
                let cita = Utils.parseInput('cita', false, true);
                if (cita === null) return;
                if (cita <= 0) {
                    Utils.showError(document.getElementById('cita'), 'Debe ser mayor a 0');
                    return;
                }
                if (cita > 10000) {
                    Utils.showError(document.getElementById('cita'), 'Máximo 10.000 citas');
                    return;
                }

                let costoCita = 0;
                let total = 0;

                if (cita <= 3) {
                    costoCita = 100000;
                    total = cita * 100000;
                } else if (cita <= 5) {
                    costoCita = 80000;
                    total = 300000 + ((cita - 3) * 80000);
                } else if (cita <= 8) {
                    costoCita = 70000;
                    total = 460000 + ((cita - 5) * 70000);
                } else {
                    costoCita = 50000;
                    total = 670000 + ((cita - 8) * 50000);
                }

                Utils.agregarFila([cita, Utils.formatCurrency(costoCita), Utils.formatCurrency(total)]);
                Utils.clearAllFields(['cita']);
                break;
            }
        }
    }
}

/**
 * CiclosController: Módulo 3 (5 ejercicios) - DOM Dinámico Matricial
 */
class CiclosController {
    static render(id, area) {
        let html = '';
        switch(id) {
            case 'ciclo1':
                html = `
                    <h2 class="titulo-ejercicio">1. Promedio general de grupo</h2>
                    <div class="controles" style="margin-bottom: 15px;">
                        <div class="grupo-input"><label>Número de estudiantes:</label><input type="text" id="n" placeholder="Ej: 3"></div>
                        <button class="btn-ejecutar" id="btn-generar">Generar Formulario</button>
                    </div>
                    <div id="dynamic-area" class="dynamic-container"></div>
                    ${Utils.generarTablaHTML(['Nombre', 'Detalle de Notas', 'Promedio Final', 'Aprobadas', 'Reprobadas'])}
                `;
                break;
            case 'ciclo2':
                html = `
                    <h2 class="titulo-ejercicio">2. Aprobados / Reprobados</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Número de estudiantes:</label><input type="text" id="n"></div>
                        <button class="btn-ejecutar" id="btn-generar">Generar Campos</button>
                    </div>
                    <div id="dynamic-area" class="dynamic-container"></div>
                    ${Utils.generarTablaHTML(['Aprobados', 'Reprobados', 'Promedio General'])}
                `;
                break;
            case 'ciclo3':
                html = `
                    <h2 class="titulo-ejercicio">3. Análisis de grupo de números</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Cantidad de números:</label><input type="text" id="n"></div>
                        <button class="btn-ejecutar" id="btn-generar">Generar Campos</button>
                    </div>
                    <div id="dynamic-area" class="dynamic-container"></div>
                    ${Utils.generarTablaHTML(['Mayor / Menor', 'Mayores a 150', 'Negativos', 'Promedio Positivos'])}
                `;
                break;
            case 'ciclo4':
                html = `
                    <h2 class="titulo-ejercicio">4. Promedio Ingeniería Financiera</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Número de estudiantes:</label><input type="text" id="n"></div>
                        <button class="btn-ejecutar" id="btn-generar">Generar Campos</button>
                    </div>
                    <div id="dynamic-area" class="dynamic-container"></div>
                    ${Utils.generarTablaHTML(['Estudiante', 'Notas', 'Promedio Individual', 'Promedio General'])}
                `;
                break;
            case 'ciclo5':
                html = `
                    <h2 class="titulo-ejercicio">5. Consumo Electrificadora</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Número de clientes:</label><input type="text" id="n"></div>
                        <div class="grupo-input"><label>Valor Vatio ($):</label><input type="text" id="vatio"></div>
                        <button class="btn-ejecutar" id="btn-generar">Generar Campos</button>
                    </div>
                    <div id="dynamic-area" class="dynamic-container"></div>
                    ${Utils.generarTablaHTML(['Cliente', 'Consumo (Kw)', 'Pago', 'Promedio Consumo General'])}
                `;
                break;
        }

        area.innerHTML = html;
        const btnGenerar = document.getElementById('btn-generar');
        if (btnGenerar) btnGenerar.addEventListener('click', () => this.generarCampos(id));
    }

    static generarCampos(id) {
        if (id === 'ciclo1') {
            let n = Utils.parseInput('n', false, true);
            if (n === null) return;
            if (n <= 0 || n > 100) {
                Utils.showError(document.getElementById('n'), n <= 0 ? 'Debe ser > 0' : 'Máx 100 estudiantes');
                return;
            }

            const area = document.getElementById('dynamic-area');
            let html = `<div class="students-wrapper" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; margin-bottom: 20px;">`;

            for (let i = 1; i <= n; i++) {
                html += `
                    <div class="student-card" data-student-id="${i}" style="border: 1px solid var(--border-light); border-radius: 12px; padding: 20px; background: var(--bg-main); box-shadow: var(--shadow-card); display: flex; flex-direction: column; gap: 14px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
                            <h3 style="margin: 0; font-size: 1.05em; color: var(--accent-cobalt); font-weight: 700;">Estudiante #${i}</h3>
                            <button type="button" class="btn-del-student btn-secundario" style="background-color: var(--error-coral); box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">✕ Eliminar</button>
                        </div>
                        <div class="grupo-input" style="margin-bottom: 0;">
                            <label>Nombre:</label>
                            <input type="text" class="student-name" value="Estudiante ${i}" placeholder="Ej: Pepa">
                        </div>
                        <div class="subjects-section" style="margin-bottom: 0;">
                            <label style="display: block; margin-bottom: 6px;"><strong>Notas del Estudiante:</strong></label>
                            <div class="subjects-list" style="display: flex; flex-direction: column; gap: 8px;">
                                <div class="subject-row" style="display: flex; gap: 8px; align-items: center;">
                                    <input type="text" class="subject-name" placeholder="Materia" value="N1" style="flex: 0.8;">
                                    <input type="text" class="subject-grade" placeholder="Nota (0-5)" style="flex: 1.2;">
                                    <button type="button" class="btn-del-subject btn-secundario" style="background-color: var(--error-coral); padding: 8px 12px; height: 42px;">✕</button>
                                </div>
                            </div>
                            <button type="button" class="btn-add-subject btn-secundario" style="margin-top: 10px; width: 100%;">+ Agregar Nota/Materia</button>
                        </div>
                        <div class="student-live-summary" style="display: flex; justify-content: space-between; gap: 10px; margin-top: 4px; padding-top: 10px; border-top: 1px dashed var(--border-hover); font-size: 0.9em;">
                            <span><strong>Promedio:</strong> <span class="res-prom">-</span></span>
                            <span><strong>Aprobadas:</strong> <span class="res-aprob" style="color: var(--success-emerald); font-weight: bold;">0</span></span>
                            <span><strong>Reprobadas:</strong> <span class="res-reprob" style="color: var(--error-coral); font-weight: bold;">0</span></span>
                        </div>
                    </div>
                `;
            }

            html += `</div>
                <div class="group-summary-bar" style="padding: 15px 20px; margin: 20px 0; background: var(--accent-cobalt-light); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: var(--text-primary);">Promedio General del Grupo:</span> 
                    <span class="res-prom-grupo" style="font-weight: bold; font-size: 1.2em; color: var(--accent-cobalt);">-</span>
                </div>
                <div style="display: flex; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
                    <button type="button" class="btn-add-student btn-secundario" style="flex: 1; min-width: 200px;">+ Agregar Otro Estudiante</button>
                    <button type="button" class="btn-ejecutar" id="btn-procesar-ciclo1" style="flex: 1; min-width: 200px;">Registrar en Historial</button>
                </div>
            `;

            area.innerHTML = html;
            CiclosController.setupCiclo1Events();
            CiclosController.calcularCiclo1Dinamicamente();
            return;
        }

        let n = Utils.parseInput('n', false, true);
        if (n === null) return;
        
        if (n <= 0 || n > 100) {
            Utils.showError(document.getElementById('n'), n <= 0 ? 'Debe ser > 0' : 'Máx 100 registros');
            return;
        }

        const area = document.getElementById('dynamic-area');
        let html = '';

        if (id === 'ciclo2') {
            for (let i = 1; i <= n; i++) {
                html += `<div class="student-row" style="margin-bottom: 10px;">
                    <div class="grupo-input"><label>Nota Estudiante ${i}:</label><input type="text" class="dinamico-val input-corto" placeholder="0.0 - 5.0"></div>
                </div>`;
            }
        } else if (id === 'ciclo3') {
            for (let i = 1; i <= n; i++) {
                html += `<div class="student-row">
                    <div class="grupo-input"><label>Número ${i}:</label><input type="text" class="dinamico-val"></div>
                </div>`;
            }
        } else if (id === 'ciclo4') {
            for (let i = 1; i <= n; i++) {
                html += `<div class="student-row">
                    <div class="grupo-input"><label>Nombre:</label><input type="text" class="dinamico-nombre"></div>
                    <div class="grupo-input"><label>N1:</label><input type="text" class="dinamico-n1 input-corto"></div>
                    <div class="grupo-input"><label>N2:</label><input type="text" class="dinamico-n2 input-corto"></div>
                    <div class="grupo-input"><label>N3:</label><input type="text" class="dinamico-n3 input-corto"></div>
                    <div class="grupo-input"><label>N4:</label><input type="text" class="dinamico-n4 input-corto"></div>
                </div>`;
            }
        } else if (id === 'ciclo5') {
            let vatio = Utils.parseInput('vatio');
            if (vatio === null) return;
            for (let i = 1; i <= n; i++) {
                html += `<div class="client-row">
                    <div class="grupo-input"><label>Cliente ${i}:</label><input type="text" class="dinamico-nombre"></div>
                    <div class="grupo-input"><label>Lec. Anterior:</label><input type="text" class="dinamico-ant input-corto"></div>
                    <div class="grupo-input"><label>Lec. Actual:</label><input type="text" class="dinamico-act input-corto"></div>
                </div>`;
            }
        }

        html += `<button class="btn-ejecutar btn-secundario" id="btn-procesar-dinamico" style="margin-top: 15px;">Procesar Datos</button>`;
        area.innerHTML = html;
        
        document.getElementById('btn-procesar-dinamico').addEventListener('click', () => this.procesarDatos(id, n));
    }

    static setupCiclo1Events() {
        const area = document.getElementById('dynamic-area');
        if (!area) return;

        area.oninput = (e) => {
            if (e.target.classList.contains('subject-grade') || e.target.classList.contains('student-name') || e.target.classList.contains('subject-name')) {
                CiclosController.calcularCiclo1Dinamicamente();
            }
        };

        area.onclick = (e) => {
            const btnAddSub = e.target.closest('.btn-add-subject');
            if (btnAddSub) {
                const card = btnAddSub.closest('.student-card');
                const list = card.querySelector('.subjects-list');
                const count = list.querySelectorAll('.subject-row').length + 1;
                const subRow = document.createElement('div');
                subRow.className = 'subject-row';
                subRow.style.cssText = 'display: flex; gap: 8px; align-items: center;';
                subRow.innerHTML = `
                    <input type="text" class="subject-name" placeholder="Materia" value="N${count}" style="flex: 0.8;">
                    <input type="text" class="subject-grade" placeholder="Nota (0-5)" style="flex: 1.2;">
                    <button type="button" class="btn-del-subject btn-secundario" style="background-color: var(--error-coral); padding: 8px 12px; height: 42px;">✕</button>
                `;
                list.appendChild(subRow);
                CiclosController.calcularCiclo1Dinamicamente();
                return;
            }

            const btnDelSub = e.target.closest('.btn-del-subject');
            if (btnDelSub) {
                const subRow = btnDelSub.closest('.subject-row');
                subRow.remove();
                CiclosController.calcularCiclo1Dinamicamente();
                return;
            }

            const btnAddStud = e.target.closest('.btn-add-student');
            if (btnAddStud) {
                const wrapper = area.querySelector('.students-wrapper');
                const count = wrapper.querySelectorAll('.student-card').length + 1;
                const newCard = document.createElement('div');
                newCard.className = 'student-card';
                newCard.setAttribute('data-student-id', count);
                newCard.style.cssText = 'border: 1px solid var(--border-light); border-radius: 12px; padding: 20px; background: var(--bg-main); box-shadow: var(--shadow-card); display: flex; flex-direction: column; gap: 14px;';
                newCard.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
                        <h3 style="margin: 0; font-size: 1.05em; color: var(--accent-cobalt); font-weight: 700;">Estudiante #${count}</h3>
                        <button type="button" class="btn-del-student btn-secundario" style="background-color: var(--error-coral); box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">✕ Eliminar</button>
                    </div>
                    <div class="grupo-input" style="margin-bottom: 0;">
                        <label>Nombre:</label>
                        <input type="text" class="student-name" value="Estudiante ${count}" placeholder="Ej: Pepe">
                    </div>
                    <div class="subjects-section" style="margin-bottom: 0;">
                        <label style="display: block; margin-bottom: 6px;"><strong>Notas del Estudiante:</strong></label>
                        <div class="subjects-list" style="display: flex; flex-direction: column; gap: 8px;">
                            <div class="subject-row" style="display: flex; gap: 8px; align-items: center;">
                                <input type="text" class="subject-name" placeholder="Materia" value="N1" style="flex: 0.8;">
                                <input type="text" class="subject-grade" placeholder="Nota (0-5)" style="flex: 1.2;">
                                <button type="button" class="btn-del-subject btn-secundario" style="background-color: var(--error-coral); padding: 8px 12px; height: 42px;">✕</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-subject btn-secundario" style="margin-top: 10px; width: 100%;">+ Agregar Nota/Materia</button>
                    </div>
                    <div class="student-live-summary" style="display: flex; justify-content: space-between; gap: 10px; margin-top: 4px; padding-top: 10px; border-top: 1px dashed var(--border-hover); font-size: 0.9em;">
                        <span><strong>Promedio:</strong> <span class="res-prom">-</span></span>
                        <span><strong>Aprobadas:</strong> <span class="res-aprob" style="color: var(--success-emerald); font-weight: bold;">0</span></span>
                        <span><strong>Reprobadas:</strong> <span class="res-reprob" style="color: var(--error-coral); font-weight: bold;">0</span></span>
                    </div>
                `;
                wrapper.appendChild(newCard);
                CiclosController.calcularCiclo1Dinamicamente();
                return;
            }

            const btnDelStud = e.target.closest('.btn-del-student');
            if (btnDelStud) {
                const wrapper = area.querySelector('.students-wrapper');
                const cards = wrapper.querySelectorAll('.student-card');
                if (cards.length <= 1) {
                    alert('Debe existir al menos un estudiante en el grupo.');
                    return;
                }
                btnDelStud.closest('.student-card').remove();
                CiclosController.calcularCiclo1Dinamicamente();
                return;
            }

            const btnProcesar = e.target.closest('#btn-procesar-ciclo1');
            if (btnProcesar) {
                CiclosController.guardarCiclo1EnHistorial();
                return;
            }
        };
    }

    static calcularCiclo1Dinamicamente() {
        const area = document.getElementById('dynamic-area');
        if (!area) return { valid: false, estudiantes: [] };

        const studentCards = area.querySelectorAll('.student-card');
        let totalPromedios = 0;
        let estudiantesValidosCount = 0;
        let todoValido = true;
        let estudiantesData = [];

        studentCards.forEach((card, idx) => {
            const nameInput = card.querySelector('.student-name');
            let nombre = nameInput && nameInput.value.trim() !== '' ? nameInput.value.trim() : `Estudiante ${idx + 1}`;
            nombre = Utils.escapeHTML(nombre);

            const subjectRows = card.querySelectorAll('.subject-row');
            let sumaNotas = 0;
            let notasCount = 0;
            let aprobadas = 0;
            let reprobadas = 0;
            let cardValida = subjectRows.length > 0;
            let notasTexto = [];

            subjectRows.forEach(row => {
                const subNameInput = row.querySelector('.subject-name');
                const gradeInput = row.querySelector('.subject-grade');
                
                let subNombre = subNameInput && subNameInput.value.trim() !== '' ? subNameInput.value.trim() : 'N';
                subNombre = Utils.escapeHTML(subNombre);
                
                Utils.clearError(gradeInput);

                const valRaw = gradeInput ? gradeInput.value.trim() : '';
                if (valRaw === '') {
                    cardValida = false;
                    return;
                }

                const check = Utils.validateValue(valRaw, false, false);
                if (!check.valid || check.num > 5) {
                    Utils.showError(gradeInput, check.valid ? 'Máx 5.0' : check.msg);
                    cardValida = false;
                    todoValido = false;
                } else {
                    sumaNotas += check.num;
                    notasCount++;
                    if (check.num >= 3.0) {
                        aprobadas++;
                    } else {
                        reprobadas++;
                    }
                    // Formato de badge/pill estilizado para cada nota
                    notasTexto.push(`<span style="background: #E0E7FF; color: #3730A3; padding: 3px 8px; border-radius: 6px; font-weight: 600; font-size: 0.85em; display: inline-block; margin: 2px;">${subNombre}: ${check.num.toFixed(1)}</span>`);
                }
            });

            const promSpan = card.querySelector('.res-prom');
            const aprobSpan = card.querySelector('.res-aprob');
            const reprobSpan = card.querySelector('.res-reprob');

            if (cardValida && notasCount > 0) {
                const promInd = sumaNotas / notasCount;
                promSpan.textContent = Utils.formatNumber(promInd);
                aprobSpan.textContent = aprobadas;
                reprobSpan.textContent = reprobadas;

                totalPromedios += promInd;
                estudiantesValidosCount++;

                estudiantesData.push({
                    nombre: nombre,
                    notasStr: notasTexto.join(' '),
                    promedio: Utils.formatNumber(promInd),
                    aprobadas: aprobadas,
                    reprobadas: reprobadas
                });
            } else {
                promSpan.textContent = '-';
                aprobSpan.textContent = '-';
                reprobSpan.textContent = '-';
                todoValido = false;
            }
        });

        const promGrupoSpan = area.querySelector('.res-prom-grupo');
        let promGralGrupo = 0;

        if (estudiantesValidosCount > 0) {
            promGralGrupo = totalPromedios / estudiantesValidosCount;
            if (promGrupoSpan) promGrupoSpan.textContent = Utils.formatNumber(promGralGrupo);
        } else {
            if (promGrupoSpan) promGrupoSpan.textContent = '-';
        }

        return {
            valid: todoValido && estudiantesValidosCount === studentCards.length && studentCards.length > 0,
            estudiantes: estudiantesData,
            cantEstudiantes: studentCards.length,
            promGralGrupo: Utils.formatNumber(promGralGrupo)
        };
    }

    static guardarCiclo1EnHistorial() {
        const res = CiclosController.calcularCiclo1Dinamicamente();

        if (!res.valid) {
            alert('Asegúrese de ingresar un nombre y todas las notas válidas (entre 0.0 y 5.0) para cada estudiante.');
            return;
        }

        res.estudiantes.forEach(est => {
            Utils.agregarFila([
                `<strong>${est.nombre}</strong>`,
                est.notasStr,
                `<strong>${est.promedio}</strong>`,
                `<span style="color: var(--success-emerald); font-weight: bold;">${est.aprobadas}</span>`,
                `<span style="color: var(--error-coral); font-weight: bold;">${est.reprobadas}</span>`
            ]);
        });

        const area = document.getElementById('dynamic-area');
        area.innerHTML = '';
        Utils.clearAllFields(['n']);
    }

    static procesarDatos(id, n) {
        const area = document.getElementById('dynamic-area');

        if (id === 'ciclo2') {
            let notas = area.querySelectorAll('.dinamico-val');
            let aprobados = 0;
            let reprobados = 0;
            let suma = 0;
            for (let inp of notas) {
                let check = Utils.validateValue(inp ? inp.value : '');
                if (!check.valid) {
                    Utils.showError(inp, check.msg);
                    return;
                }
                if (check.num > 5) {
                    Utils.showError(inp, 'Máx 5.0');
                    return;
                }
                Utils.clearError(inp);
                
                if (check.num >= 3.0) aprobados++;
                else reprobados++;
                suma += check.num;
            }
            Utils.agregarFila([aprobados, reprobados, Utils.formatNumber(suma / n)]);
            area.innerHTML = '';
            Utils.clearAllFields(['n']);
        }
        else if (id === 'ciclo3') {
            let inputs = area.querySelectorAll('.dinamico-val');
            let mayor = -Infinity;
            let menor = Infinity;
            let cant150 = 0;
            let neg = 0;
            let sumaPos = 0;
            let cantPos = 0;

            for (let inp of inputs) {
                let check = Utils.validateValue(inp ? inp.value : '', true);
                if (!check.valid) {
                    Utils.showError(inp, check.msg);
                    return;
                }
                Utils.clearError(inp);
                let val = check.num;
                if (val > mayor) mayor = val;
                if (val < menor) menor = val;
                if (val > 150) cant150++;
                if (val < 0) neg++;
                if (val > 0) { sumaPos += val; cantPos++; }
            }
            let promPos = cantPos > 0 ? (sumaPos / cantPos) : 0;
            Utils.agregarFila([`M:${mayor} / m:${menor}`, cant150, neg, Utils.formatNumber(promPos)]);
            area.innerHTML = '';
            Utils.clearAllFields(['n']);
        }
        else if (id === 'ciclo4') {
            let rows = area.querySelectorAll('.student-row');
            let sumaGral = 0;
            let resultHtml = [];
            for (let row of rows) {
                let nombreInp = row.querySelector('.dinamico-nombre');
                let nombre = nombreInp && nombreInp.value.trim() !== '' ? nombreInp.value.trim() : 'Estudiante';
                nombre = Utils.escapeHTML(nombre);
                
                let inps = [
                    row.querySelector('.dinamico-n1'), 
                    row.querySelector('.dinamico-n2'), 
                    row.querySelector('.dinamico-n3'), 
                    row.querySelector('.dinamico-n4')
                ];
                let notas = [];
                let hasError = false;
                
                for (let inp of inps) {
                    let check = Utils.validateValue(inp ? inp.value : '');
                    if (!check.valid) {
                        Utils.showError(inp, check.msg);
                        hasError = true;
                    } else if (check.num > 5) {
                        Utils.showError(inp, 'Máx 5.0');
                        hasError = true;
                    } else {
                        Utils.clearError(inp);
                        notas.push(check.num);
                    }
                }
                if (hasError) return;
                
                let promInd = (notas[0] + notas[1] + notas[2] + notas[3]) / 4;
                sumaGral += promInd;
                resultHtml.push(`${nombre}: ${Utils.formatNumber(promInd)}`);
            }
            let promGral = sumaGral / n;
            Utils.agregarFila(['Varios', 'Ver Detalle', resultHtml.join('<br>'), Utils.formatNumber(promGral)]);
            area.innerHTML = '';
            Utils.clearAllFields(['n']);
        }
        else if (id === 'ciclo5') {
            let rows = area.querySelectorAll('.client-row');
            let vatio = Utils.parseInput('vatio');
            if (vatio === null) return;

            let sumaConsumo = 0;
            let resultHtml = [];
            for (let row of rows) {
                let nombreInp = row.querySelector('.dinamico-nombre');
                let nombre = nombreInp && nombreInp.value.trim() !== '' ? nombreInp.value.trim() : 'Cliente';
                nombre = Utils.escapeHTML(nombre); 
                
                let inps = [row.querySelector('.dinamico-ant'), row.querySelector('.dinamico-act')];
                
                let checkAnt = Utils.validateValue(inps[0] ? inps[0].value : '');
                let checkAct = Utils.validateValue(inps[1] ? inps[1].value : '');
                
                let hasError = false;
                if (!checkAnt.valid) { Utils.showError(inps[0], checkAnt.msg); hasError = true; } else { Utils.clearError(inps[0]); }
                if (!checkAct.valid) { Utils.showError(inps[1], checkAct.msg); hasError = true; } else { Utils.clearError(inps[1]); }
                if (hasError) return;

                if (checkAct.num < checkAnt.num) {
                    Utils.showError(inps[1], 'Debe ser >= anterior');
                    return;
                } else {
                    Utils.clearError(inps[1]);
                }
                
                let cons = checkAct.num - checkAnt.num;
                sumaConsumo += cons;
                let pago = cons * vatio;
                resultHtml.push(`${nombre} (P: ${Utils.formatCurrency(pago)})`);
            }
            let promConsumo = sumaConsumo / n;
            Utils.agregarFila(['Varios', 'Ver Detalle', resultHtml.join('<br>'), Utils.formatNumber(promConsumo)]);
            area.innerHTML = '';
            Utils.clearAllFields(['n', 'vatio']);
        }
    }
}

/**
 * App: Gestor Principal
 */
class App {
    static init() {
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebar) {
            sidebar.addEventListener('click', function(e) {
                const menuBtn = e.target.closest('.menu-btn');
                if (menuBtn) {
                    const submenu = menuBtn.nextElementSibling;
                    if (submenu) {
                        document.querySelectorAll('.submenu').forEach(sub => {
                            if (sub !== submenu) sub.style.display = "none";
                        });
                        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
                    }
                    return;
                }
                
                const ejercicioBtn = e.target.closest('.ejercicio-btn');
                if (ejercicioBtn) {
                    document.querySelectorAll('.ejercicio-btn').forEach(b => b.classList.remove('active'));
                    ejercicioBtn.classList.add('active');
                    
                    const id = ejercicioBtn.getAttribute('data-ejercicio');
                    if (id) {
                        App.cargarEjercicio(id);
                    }
                }
            });
        }
    }

    static cargarEjercicio(id) {
        const area = document.getElementById('area-ejercicio');
        area.className = 'tarjeta-ejercicio fade-in';
        
        area.style.animation = 'none';
        area.offsetHeight;
        area.style.animation = null;

        if (id.startsWith('sec')) {
            SecuencialesController.render(id, area);
        } else if (id.startsWith('cond')) {
            CondicionalesController.render(id, area);
        } else if (id.startsWith('ciclo')) {
            CiclosController.render(id, area);
        }
    }
}

document.addEventListener('DOMContentLoaded', App.init);
