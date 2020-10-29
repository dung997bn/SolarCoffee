import { __awaiter, __generator } from "tslib";
import axios from "axios";
var OrderService = /** @class */ (function () {
    function OrderService() {
        this.API_URL = process.env.VUE_APP_API_URL;
    }
    OrderService.prototype.getOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.API_URL + "/order/")];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    OrderService.prototype.markOrderComplete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.patch(this.API_URL + "/order/complete/" + id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    return OrderService;
}());
export { OrderService };
//# sourceMappingURL=order-service.js.map