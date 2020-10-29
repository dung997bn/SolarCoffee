import { __awaiter, __generator } from "tslib";
import { make } from "vuex-pathify";
import { InventoryService } from "@/services/inventory-service";
var GlobalStore = /** @class */ (function () {
    function GlobalStore() {
        this.snapshotTimeline = {
            productInventorySnapshots: [],
            timeline: [],
        };
        this.isTimelineBuilt = false;
    }
    return GlobalStore;
}());
var state = new GlobalStore();
var mutations = make.mutations(state);
var actions = {
    assignSnapshot: function (_a) {
        var commit = _a.commit;
        return __awaiter(this, void 0, void 0, function () {
            var inventoryService, res, timeline;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        debugger;
                        inventoryService = new InventoryService();
                        return [4 /*yield*/, inventoryService.getSnapshotHistory()];
                    case 1:
                        res = _b.sent();
                        timeline = {
                            productInventorySnapshots: res.productInventorySnapshots,
                            timeline: res.timeline,
                        };
                        commit("SET_SNAPSHOT_TIMELINE", timeline);
                        commit("SET_IS_TIMELINE_BUILT", true);
                        return [2 /*return*/];
                }
            });
        });
    },
};
var getters = {};
export default {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
};
//# sourceMappingURL=global-store.js.map