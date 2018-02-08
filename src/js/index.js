import { GraphDataModel } from "./graph.data.model";
import { DisableGraphComponent } from "./disable.graph.component";
import { EnableGraphComponent } from "./enable.graph.component";



const data = new GraphDataModel(100,0);
const enableComponent = new EnableGraphComponent('.chart-container', data);
const disableComponent = new DisableGraphComponent('.chart-container', data);




