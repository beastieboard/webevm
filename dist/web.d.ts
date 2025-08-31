/// <reference types="node" />
/// <reference types="node" />
import { Buffer } from 'buffer';
import { Address, Account } from '@ethereumjs/util';
import { EEIInterface } from './types';
import { EVM } from './evm';
export declare class LocalEEI implements Partial<EEIInterface> {
    accounts: {
        [address: string]: Account;
    };
    storage: {
        [key: string]: Buffer;
    };
    contractCode: {
        [key: string]: Buffer;
    };
    constructor();
    checkpoint(): Promise<void>;
    getAccount(address: Address): Account;
    putAccount(address: Address, account: Account): void;
    clearContractStorage(address: Address): Promise<void>;
    commit(): Promise<void>;
    revert(): Promise<void>;
    getContractCode(address: Address): Buffer;
    putContractCode(address: Address, value: Buffer): void;
    storageLoad(address: Address, key: Buffer, original: boolean): Buffer;
    storageStore(address: Address, key: Buffer, value: Buffer): Promise<void>;
    addWarmedAddress(_address: Buffer): void;
}
export declare function createWebEVM(): EVM;
//# sourceMappingURL=web.d.ts.map