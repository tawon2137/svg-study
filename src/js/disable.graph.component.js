import { GraphComponent } from "./graph.component";

export class DisableGraphComponent extends GraphComponent {
    constructor(selector, data) {
        super(selector, data);
    }
    createPath(color) {
        this.path = document.createElementNS(this.svg.namespaceURI, 'path');
        this.path.setAttribute('fill', color);
        const id = 'graph-filter-2';
        this.setDefs(this.path, {
            name: 'filter',
            id: id,
            html: `
               <filter id="${id}">
                <feOffset dx="0.5" dy="1" in="SourceAlpha"></feOffset>
                <feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur>
                <feFlood flood-color="#2A2F3A" result="floodOut"></feFlood>
                <feComposite in="floodOut" in2="blurOut" operator="out" result="compOut"></feComposite>
                <feComposite in="compOut" in2="SourceAlpha" operator="in"></feComposite>
                <feComponentTransfer>
                    <feFuncA slope=".14" type="linear"></feFuncA>
                </feComponentTransfer>
                <feBlend in2="SourceGraphic" mode="multiply"></feBlend>
            </filter>
            `
        });
        this.svg.appendChild(this.path);
        this.svg.setAttribute('class', 'disable-graph');
    }
    init() {
        super.init();

    }
    render() {
        if(!this.path) {
            this.createPath(`#EBEBEB`);
        }
        const position = {
            w: this.el.offsetWidth / 100 * this.data.disableValue,
            h: this.el.offsetWidth / 100 * 7.8
        };

        this.svg.style.width = position.w;
        this.svg.style.height = position.h;

        const graphHeight = position.h - 12;
        const pointCurve = graphHeight * 0.3;
        const curve = position.h * 0.50, curveAngle = position.h * 0.083;
        this.path.setAttribute('d', `
            M ${position.w} ${graphHeight} 
            L 0 ${graphHeight}
            l ${curve} -${graphHeight - pointCurve} 
            c ${curveAngle} -${curveAngle} ${curveAngle * 3} -${pointCurve} ${curveAngle * 6} -${pointCurve}
            H ${position.w - curveAngle}
            a ${curveAngle} ${curveAngle} 0 0 1 ${curveAngle} ${curveAngle}
            v ${graphHeight - curveAngle * 2}
            a ${curveAngle} ${curveAngle} 0 0 1 -${curveAngle} ${curveAngle}
            z
        `);
    }
}
