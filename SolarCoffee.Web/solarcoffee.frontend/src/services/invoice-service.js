import { __awaiter, __generator } from "tslib";
import axios from "axios";
var InvoiceService = /** @class */ (function () {
    function InvoiceService() {
        this.API_URL = process.env.VUE_APP_API_URL;
    }
    InvoiceService.prototype.makeNewInvoice = function (invoice) {
        return __awaiter(this, void 0, void 0, function () {
            var now, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        invoice.createdOn = now;
                        invoice.updatedOn = now;
                        return [4 /*yield*/, axios.post(this.API_URL + "/invoice/", invoice)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    return InvoiceService;
}());
export { InvoiceService };
//# sourceMappingURL=invoice-service.js.map