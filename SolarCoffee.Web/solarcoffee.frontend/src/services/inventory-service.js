import { __awaiter, __generator } from "tslib";
import axios from "axios";
var InventoryService = /** @class */ (function () {
    function InventoryService() {
        this.API_URL = process.env.VUE_APP_API_URL;
    }
    InventoryService.prototype.getInventory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios
                            .get(this.API_URL + "/inventory")
                            .then(function (res) { return res.data; })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    InventoryService.prototype.updateInventoryQuantity = function (shipment) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.patch(this.API_URL + "/inventory", shipment)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    InventoryService.prototype.getSnapshotHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.API_URL + "/inventory/snapshot")];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    return InventoryService;
}());
export { InventoryService };
//# sourceMappingURL=inventory-service.js.map