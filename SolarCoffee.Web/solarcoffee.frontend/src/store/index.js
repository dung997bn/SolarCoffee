import { __assign } from "tslib";
import { createStore } from "vuex";
import pathify from "vuex-pathify";
import global from "@/store/global-store";
pathify.options.mapping = "simple";
pathify.options.deep = 2;
export default createStore(__assign(__assign({}, global), { modules: {}, plugins: [pathify.plugin] }));
//# sourceMappingURL=index.js.map