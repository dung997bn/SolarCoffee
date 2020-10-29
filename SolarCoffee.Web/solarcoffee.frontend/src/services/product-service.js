import { __awaiter, __generator } from "tslib";
import axios from "axios";
var ProductService = /** @class */ (function () {
    function ProductService() {
        this.API_URL = process.env.VUE_APP_API_URL;
    }
    ProductService.prototype.archive = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.patch(this.API_URL + "/product/" + productId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ProductService.prototype.save = function (newProduct) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.post(this.API_URL + "/product", newProduct)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    return ProductService;
}());
export { ProductService };
//# sourceMappingURL=product-service.js.map