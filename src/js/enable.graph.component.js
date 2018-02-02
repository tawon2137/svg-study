import { GraphComponent } from "./graph.component";

export class EnableGraphComponent extends GraphComponent {
    constructor(selector, data) {
        super(selector, data);
    }
    createPath(color) {
        this.path = document.createElementNS(this.svg.namespaceURI, 'path');
        const id = 'graph-filter-1';
        const fillId = 'graph-fill-1';
        this.setDefs(this.path, {
            name: 'filter',
            id: id,
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
        this.setDefs(this.path, {
            name: 'fill',
            id: fillId,
            html: `
                <linearGradient id="${fillId}" x1="60%" y1="79%" x2="100%" y2="80%">
                    <stop offset="50%" style="stop-color:#00C4D8;stop-opacity:1" />
                    <stop offset="70%" style="stop-color:#00C4D8;stop-opacity:0.1" />
                    <stop offset="100%" style="stop-color:#00C4D8;stop-opacity:1" />
                </linearGradient>
            `
        });

        this.svg.appendChild(this.path);
        this.svg.setAttribute('class', 'enable-graph');
    }
    init() {
        super.init();
    }
    render() {
        if(!this.path) {
            this.createPath(`#00C4D8`);
        }
        const margin = 6;
        const position = {
            w: this.el.offsetWidth / 100 * this.data.enableValue,
            h: this.el.offsetWidth / 100 * 7.8
        };
        this.svg.style.width = position.w;
        this.svg.style.height = position.h;
        const graphHeight = position.h - 12;
        const pointCurve = graphHeight * 0.3;
        const curve = position.h * 0.50, curveAngle = position.h * 0.083;
        // this.path.setAttribute('d', `
        //     M${position.w - curve} ${graphHeight - 10}
        //     C${position.w - margin - curve} ${graphHeight - curveAngle} ${(position.w - margin - curve) - (margin * 2)}  ${graphHeight} ${(position.w - margin - curve - margin) - (margin * 4)} ${graphHeight}
        //     H${margin}
        //     a${margin} ${margin} 0 0 1 -${margin} -${margin}
        //     V${margin}
        //     a${margin} ${margin} 0 0 1 ${margin} -${margin}
        //     l${position.w - margin} 0 -${curve} ${curve}z
        // `);
        this.path.setAttribute('d', `
            M ${curveAngle} 0
            h ${position.w - curveAngle}
            l 0 0 -${curve} ${graphHeight - pointCurve} 
            c -${curveAngle} ${curveAngle} -${curveAngle * 3} ${pointCurve} -${curveAngle * 6} ${pointCurve}
            H ${curveAngle}
            a -${curveAngle} -${curveAngle} 0 0 1 -${curveAngle} -${curveAngle}
            v -${graphHeight - curveAngle * 2}
            a ${curveAngle} -${curveAngle} 0 0 1 ${curveAngle} -${curveAngle}
            
        `);
    }
}
