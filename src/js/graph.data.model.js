export class GraphDataModel {
    constructor(enableValue, disableValue, minValue) {
        this.minValue = minValue || 15;

        this.enableValue = typeof enableValue === 'number' ? enableValue : 0;
        this.disableValue = typeof disableValue === 'number' ? disableValue : 0;


        if(this.isMinValue(this.enableValue)) {
            this.enableValue = this.minValue;
            this.disableValue = 100 - this.minValue;
        }else if(this.isMinValue(this.disableValue)){
            this.disableValue = this.minValue;
            this.enableValue = 100 - this.minValue;
        }

    }
    isMinValue(value) {
        return value > 0 && value <= this.minValue;
    }
}
