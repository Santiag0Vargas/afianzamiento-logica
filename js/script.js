/**
 * Utils: Manejo de formato, validaciones y DOM.
 */
class Utils {
    static parseInput(id, allowNegative = false) {
        const input = document.getElementById(id);
        if(!input) return null;
        Utils.clearError(input);
        
        let val = input.value.trim().replace(',', '.');
        if (val === '') {
            Utils.showError(input, 'Campo requerido');
            return null;
        }
        
        let num = parseFloat(val);
        if (isNaN(num)) {
            Utils.showError(input, 'Debe ser numérico');
            return null;
        }
        
        if (!allowNegative && num < 0) {
            Utils.showError(input, 'No admite negativos');
            return null;
        }
        
        return num;
    }

    static showError(input, message) {
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
        input.classList.remove('input-error');
        let errorSpan = input.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.remove();
        }
    }

    static clearAllFields(ids) {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if(el) {
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
            <div class="resultados-container fade-in">
                <h3 class="titulo-resultados">Resultados</h3>
                <table class="tabla-historial">
                    <thead><tr>${ths}</tr></thead>
                    <tbody id="historial-body"></tbody>
                </table>
            </div>
        `;
    }

    static agregarFila(valoresArray) {
        const tbody = document.getElementById('historial-body');
        if(!tbody) return;
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
                    <h2 class="titulo-ejercicio">3. Nota definitiva ITFIP</h2>
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
                    ${Utils.generarTablaHTML(['Radio', 'Área (π R²)'])}
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
                    ${Utils.generarTablaHTML(['Litros', 'Galones', 'Precio/G', 'Ganancia Total'])}
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
                    ${Utils.generarTablaHTML(['(X1, Y1)', '(X2, Y2)', 'Distancia'])}
                `;
                break;
            case 'sec9':
                html = `
                    <h2 class="titulo-ejercicio">9. Conversión Metros a Pulgadas</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Metros (m):</label><input type="text" id="metros"></div>
                        <button class="btn-ejecutar" id="btn-accion">Convertir</button>
                    </div>
                    ${Utils.generarTablaHTML(['Metros', 'Pulgadas (in)'])}
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
                    ${Utils.generarTablaHTML(['Medidas (LxAxH)', 'Cant.', 'Vol. Total', 'Pago Realizar'])}
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
                Utils.agregarFila([n1, n2, Utils.formatNumber(n1+n2)]);
                Utils.clearAllFields(['n1', 'n2']);
                break;
            }
            case 'sec2': {
                let b = Utils.parseInput('base');
                let h = Utils.parseInput('altura');
                if (b === null || h === null) return;
                Utils.agregarFila([b, h, Utils.formatNumber(b*h)]);
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
                let def = (n1*0.3) + (n2*0.3) + (n3*0.4);
                Utils.agregarFila([n1, n2, n3, Utils.formatNumber(def)]);
                Utils.clearAllFields(['n1', 'n2', 'n3']);
                break;
            }
            case 'sec4': {
                let r = Utils.parseInput('radio');
                if (r === null) return;
                let area = 3.1416 * Math.pow(r, 2);
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
                let areaTri = r * cateto; // 2 triangulos * (r*c)/2
                let areaSemi = (3.1416 * Math.pow(r, 2)) / 2;
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
                let cant = Utils.parseInput('cant');
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
                    ${Utils.generarTablaHTML(['Precio Base', 'Descuento (%)', 'Monto Desc.', 'Precio Final'])}
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
                    ${Utils.generarTablaHTML(['Números', 'Mayor', 'Orden Descendente'])}
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
                    ${Utils.generarTablaHTML(['Cita Nº', 'Costo Cita', 'Total Acumulado'])}
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
                let cant = Utils.parseInput('cant');
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
                Utils.agregarFila([`${n1}, ${n2}, ${n3}`, arr[0], arr.join(' > ')]);
                Utils.clearAllFields(['n1', 'n2', 'n3']);
                break;
            }
            case 'cond6': {
                let p = Utils.parseInput('personas');
                if (p === null) return;
                if (p <= 0) {
                    Utils.showError(document.getElementById('personas'), 'Debe ser mayor a 0');
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
                let cita = Utils.parseInput('cita');
                if (cita === null) return;
                if (!Number.isInteger(cita) || cita <= 0) {
                    Utils.showError(document.getElementById('cita'), 'Debe ser un entero > 0');
                    return;
                }
                let total = 0;
                let costoCita = 0;
                for (let i = 1; i <= cita; i++) {
                    let cost = 0;
                    if (i <= 3) cost = 100000;
                    else if (i <= 5) cost = 80000;
                    else if (i <= 8) cost = 70000;
                    else cost = 50000;
                    
                    if (i === cita) costoCita = cost;
                    total += cost;
                }
                Utils.agregarFila([cita, Utils.formatCurrency(costoCita), Utils.formatCurrency(total)]);
                Utils.clearAllFields(['cita']);
                break;
            }
        }
    }
}

/**
 * CiclosController: Módulo 3 (5 ejercicios) - DOM Dinámico
 */
class CiclosController {
    static render(id, area) {
        let html = '';
        switch(id) {
            case 'ciclo1':
                html = `
                    <h2 class="titulo-ejercicio">1. Promedio general de grupo</h2>
                    <div class="controles">
                        <div class="grupo-input"><label>Número de estudiantes (N):</label><input type="text" id="n"></div>
                        <button class="btn-ejecutar" id="btn-generar">Generar Campos</button>
                    </div>
                    <div id="dynamic-area" class="dynamic-container"></div>
                    ${Utils.generarTablaHTML(['N Estudiantes', 'Promedio General'])}
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
                    ${Utils.generarTablaHTML(['Aprobados', 'Reprobados', 'Promedio Gral'])}
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
                    ${Utils.generarTablaHTML(['Mayor / Menor', '>150', 'Negativos', 'Prom. Positivos'])}
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
                    ${Utils.generarTablaHTML(['Estudiante', 'Notas', 'Prom. Indiv', 'Prom. Gral'])}
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
                    ${Utils.generarTablaHTML(['Cliente', 'Consumo (Kw)', 'Pago', 'Prom. Consumo Gral'])}
                `;
                break;
        }

        area.innerHTML = html;
        const btnGenerar = document.getElementById('btn-generar');
        if (btnGenerar) btnGenerar.addEventListener('click', () => this.generarCampos(id));
    }

    static generarCampos(id) {
        let n = Utils.parseInput('n');
        if (n === null || n <= 0 || !Number.isInteger(n)) {
            Utils.showError(document.getElementById('n'), 'Debe ser un entero mayor a 0');
            return;
        }

        const area = document.getElementById('dynamic-area');
        let html = '';

        if (id === 'ciclo1') {
            for (let i = 1; i <= n; i++) {
                html += `<div class="student-row">
                    <div class="grupo-input"><label>Nota Estudiante ${i}:</label><input type="text" class="dinamico-val"></div>
                </div>`;
            }
        } else if (id === 'ciclo2') {
            for (let i = 1; i <= n; i++) {
                html += `<div class="student-row">
                    <div class="grupo-input"><label>ID:</label><input type="text" class="dinamico-id input-corto"></div>
                    <div class="grupo-input"><label>Nombre:</label><input type="text" class="dinamico-nombre"></div>
                    <div class="grupo-input"><label>Nota:</label><input type="text" class="dinamico-val input-corto"></div>
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

        html += `<button class="btn-ejecutar btn-secundario" id="btn-procesar-dinamico">Procesar Datos</button>`;
        area.innerHTML = html;
        
        document.getElementById('btn-procesar-dinamico').addEventListener('click', () => this.procesarDatos(id, n));
    }

    static procesarDatos(id, n) {
        const area = document.getElementById('dynamic-area');
        
        if (id === 'ciclo1') {
            let inputs = area.querySelectorAll('.dinamico-val');
            let suma = 0;
            for (let inp of inputs) {
                let val = parseFloat(inp.value.replace(',', '.'));
                if (isNaN(val) || val < 0 || val > 5) {
                    Utils.showError(inp, 'Nota 0-5');
                    return;
                }
                Utils.clearError(inp);
                suma += val;
            }
            Utils.agregarFila([n, Utils.formatNumber(suma / n)]);
            area.innerHTML = '';
            Utils.clearAllFields(['n']);
        } 
        else if (id === 'ciclo2') {
            let notas = area.querySelectorAll('.dinamico-val');
            let aprobados = 0;
            let reprobados = 0;
            let suma = 0;
            for (let inp of notas) {
                let val = parseFloat(inp.value.replace(',', '.'));
                if (isNaN(val) || val < 0 || val > 5) {
                    Utils.showError(inp, 'Nota 0-5');
                    return;
                }
                Utils.clearError(inp);
                if (val >= 3.0) aprobados++;
                else reprobados++;
                suma += val;
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
                let val = parseFloat(inp.value.replace(',', '.'));
                if (isNaN(val)) {
                    Utils.showError(inp, 'Requerido');
                    return;
                }
                Utils.clearError(inp);
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
                let nombre = row.querySelector('.dinamico-nombre').value;
                if(nombre.trim() === '') nombre = 'Estudiante';
                
                let inps = [row.querySelector('.dinamico-n1'), row.querySelector('.dinamico-n2'), row.querySelector('.dinamico-n3'), row.querySelector('.dinamico-n4')];
                let notas = [];
                let hasError = false;
                for(let inp of inps) {
                    let val = parseFloat(inp.value.replace(',','.'));
                    if(isNaN(val) || val < 0 || val > 5) {
                        Utils.showError(inp, 'Nota 0-5');
                        hasError = true;
                    } else {
                        Utils.clearError(inp);
                    }
                    notas.push(val);
                }
                if (hasError) return;
                
                let promInd = (notas[0]+notas[1]+notas[2]+notas[3])/4;
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
                let nombre = row.querySelector('.dinamico-nombre').value || 'Cliente';
                let inps = [row.querySelector('.dinamico-ant'), row.querySelector('.dinamico-act')];
                let ant = parseFloat(inps[0].value.replace(',','.'));
                let act = parseFloat(inps[1].value.replace(',','.'));
                
                let hasError = false;
                if (isNaN(ant)) { Utils.showError(inps[0], 'Requerido'); hasError = true; } else { Utils.clearError(inps[0]); }
                if (isNaN(act)) { Utils.showError(inps[1], 'Requerido'); hasError = true; } else { Utils.clearError(inps[1]); }
                if (hasError) return;

                if (act < ant) {
                    Utils.showError(inps[1], 'Debe ser > anterior');
                    return;
                } else {
                    Utils.clearError(inps[1]);
                }
                
                let cons = act - ant;
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
