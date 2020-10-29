import { __awaiter, __generator } from "tslib";
import axios from "axios";
var CustomerService = /** @class */ (function () {
    function CustomerService() {
        this.API_URL = process.env.VUE_APP_API_URL;
    }
    CustomerService.prototype.getCustomers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios
                            .get(this.API_URL + "/customer")
                            .then(function (res) { return res.data; })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CustomerService.prototype.addCustomers = function (newCustomer) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.post(this.API_URL + "/customer", newCustomer)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    CustomerService.prototype.deleteCustomer = function (customerId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.delete(this.API_URL + "/customer/" + customerId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    return CustomerService;
}());
export { CustomerService };
//# sourceMappingURL=customer-service.js.map