import { GraphComponent } from "./graph.component";

export class EnableGraphComponent extends GraphComponent {
    constructor(selector, data) {
        super(selector, data);
    }
    createPath() {
        this.path = document.createElementNS(this.svg.namespaceURI, 'path');
        const id = 'graph-filter-1';
        this.setDefs(this.path, {
            name: 'filter',
            id: `url(#${id})`,
            html: `
                <filter id="${id}" width="100%" height="100%" x="0" y="0" filterUnits="userSpaceOnUse">
                    <feOffset dy="8" in="SourceAlpha"></feOffset>
                    <feGaussianBlur result="blurOut" stdDeviation="2.828"></feGaussianBlur>
                    <feFlood flood-color="#7E94A5" result="floodOut"></feFlood>
                    <feComposite in="floodOut" in2="blurOut" operator="atop"></feComposite>
                    <feComponentTransfer>
                        <feFuncA slope=".25" type="linear"></feFuncA>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            `
        });
        const color = this.data.isMinValue(this.data.enableValue) ? '#ea3434' : '#00C4D8';
        const fillId = 'graph-fill-1';
        this.setDefs(this.path, {
            name: 'fill',
            id: `url(#${fillId})`,
            html: `
                <linearGradient id="${fillId}"  x1="0" y1="0" x2="100%" y2="${this.data.enableValue === 100 ? 0 : 7}%" gradientUnits="objectBoundingBox">
                    <stop offset="90%" style="stop-color:${color};stop-opacity:1" />
                    <stop offset="95%" style="stop-color:${color};stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
                </linearGradient>
            `
        });


        this.svg.setAttribute('fill-rule', 'evenodd');
        this.svg.setAttribute('class', 'enable-graph');
        this.svg.appendChild(this.path);
    }
    init() {
        super.init();
    }
    render() {
        if(!this.path) {
            this.createPath();
        }
        const position = this.getPosition(this.data.enableValue);

        this.svg.style.width = position.w;
        this.svg.style.height = position.h;
        const graphHeight = position.h - 12;
        const pointCurve = graphHeight * 0.3;
        const curve = position.h * 0.50, curveAngle = position.h * 0.083;

        if(this.data.enableValue !== 100) {
            this.path.setAttribute('d', `
            M ${curveAngle} 0
            h ${position.w - curveAngle}
            l 0 0 ${-curve} ${graphHeight - pointCurve}
            c ${-curveAngle} ${curveAngle} ${-curveAngle * 3} ${pointCurve} ${-curveAngle * 6} ${pointCurve}
            H ${curveAngle}
            a ${-curveAngle} ${-curveAngle} 0 0 1 ${-curveAngle} ${-curveAngle}
            v ${-(graphHeight - curveAngle * 2)}
            a ${curveAngle} ${-curveAngle} 0 0 1 ${curveAngle} ${-curveAngle}
        `);
        }else {
            this.path.setAttribute('d', `
            M ${curveAngle} 0
            h ${position.w - curveAngle * 2}
            a ${curveAngle} ${curveAngle} 0 0 1 ${curveAngle} ${curveAngle}
            v ${graphHeight - curveAngle * 2}
            a ${-curveAngle} ${curveAngle} 0 0 1 ${-curveAngle} ${curveAngle}
            H ${curveAngle}
            a ${-curveAngle} ${-curveAngle} 0 0 1 ${-curveAngle} ${-curveAngle}
            v ${-(graphHeight - curveAngle * 2)}
            a ${curveAngle} ${-curveAngle} 0 0 1 ${curveAngle} ${-curveAngle}          
        `);
        }
    }
}
