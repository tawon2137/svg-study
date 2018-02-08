import { GraphDataModel } from './graph.data.model';

export class GraphComponent {
    constructor(selector, data) {
        this.el = document.querySelector(selector);

        if(this.el) {
            this.init();
            this.setData(data);
        }else {
            throw new Error('존재하지않는 엘리먼트의 셀렉터');
        }
    }

    init() {
        this.createSvg();
        window.addEventListener('resize', _ => {
           this.render();
        });
    }
    setData(data) {
        if(!data instanceof GraphDataModel) {
            throw new Error('데이터 모델이 형식에 맞지않습니다.');
        }
        this.data = data;
        this.render();
    }
    getPosition(value) {
        return {
            w: Math.round(this.el.offsetWidth / 100 * value) - 1,
            h: Math.round(this.el.offsetWidth / 100 * 7.8)
        };
    }
    createSvg() {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.defs = document.createElementNS(this.svg.namespaceURI, 'defs');
        this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.svg.setAttribute('version', '1.1');

        this.svg.appendChild(this.defs);
        this.el.appendChild(this.svg);
    }
    render() {}
    setDefs(el, defsModel) {
        this.defs.innerHTML += defsModel.html;
        el.setAttribute(defsModel.name, `${defsModel.id}`);
    }
};
