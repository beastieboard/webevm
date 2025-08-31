"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalEEI = void 0;
exports.createWebEVM = createWebEVM;
const buffer_1 = require("buffer");
const common_1 = require("@ethereumjs/common");
const util_1 = require("@ethereumjs/util");
const evm_1 = require("./evm");
const common = new common_1.Common({
    chain: common_1.Chain.Mainnet, // hardfork: Hardfork.Shanghai,
    eips: [1153, 1559, 2315, 2565, 2718, 2929, 2930, 3074, 3198, 3529, 3540, 3541, 3607, 3651, 3670, 3855, 3860, 4399, 5133]
});
class LocalEEI {
    constructor() {
        this.accounts = {};
        this.storage = {};
        this.contractCode = {};
    }
    async checkpoint() { }
    getAccount(address) {
        return {
            balance: BigInt(0),
            nonce: BigInt(0),
            codeHash: util_1.KECCAK256_NULL,
        };
    }
    putAccount(address, account) {
        this.accounts[address.toString()] = account;
    }
    async clearContractStorage(address) {
        //console.log('clearContractStorage requested, ignoring', address)
    }
    async commit() {
        //console.log('commit requested, ignoring')
    }
    async revert() {
        //console.log('revert requested, ignoring')
    }
    getContractCode(address) {
        return this.contractCode[address.toString()];
    }
    putContractCode(address, value) {
        this.contractCode[address.toString()] = value;
    }
    storageLoad(address, key, original) {
        //console.log('storageLoad', address, key)
        let k = address.toString() + key.toString();
        let o = this.storage[k];
        if (o)
            return o;
        return buffer_1.Buffer.alloc(0);
    }
    async storageStore(address, key, value) {
        //console.log('storageStore', address, key, value)
        let k = address.toString() + key.toString();
        this.storage[k] = value;
    }
    addWarmedAddress(_address) { }
}
exports.LocalEEI = LocalEEI;
function createWebEVM() {
    return new evm_1.EVM({
        common,
        eei: new LocalEEI()
    });
}
//# sourceMappingURL=web.js.map