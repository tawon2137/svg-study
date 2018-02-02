export class GraphDataModel {
    constructor(enableValue, disableValue) {
        this.enableValue = typeof enableValue === 'number' ? enableValue : 0;
        this.disableValue = typeof disableValue === 'number' ? disableValue : 0;
    }
}
