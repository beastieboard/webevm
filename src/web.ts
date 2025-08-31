import { Buffer } from 'buffer'
import { Chain, Common } from '@ethereumjs/common'
import { Address, Account, KECCAK256_NULL } from '@ethereumjs/util'
import { EEIInterface } from './types'
import { EVM } from './evm'


const common = new Common({
  chain: Chain.Mainnet, // hardfork: Hardfork.Shanghai,
  eips: [1153, 1559, 2315, 2565, 2718, 2929, 2930, 3074, 3198, 3529, 3540, 3541, 3607, 3651, 3670, 3855, 3860, 4399, 5133]
})


export class LocalEEI implements Partial<EEIInterface> {
  accounts: { [address: string]: Account }
  storage: { [key: string]: Buffer }
  contractCode: { [key: string]: Buffer }

  constructor() {
    this.accounts = {}
    this.storage = {}
    this.contractCode = {}
  }
  async checkpoint(): Promise<void> {}
  getAccount(address: Address): Account {
    return {
      balance: BigInt(0),
      nonce: BigInt(0),
      codeHash: KECCAK256_NULL,
    } as Account
  }
  putAccount(address: Address, account: Account) {
    this.accounts[address.toString()] = account
  }
  async clearContractStorage(address: Address) {
    //console.log('clearContractStorage requested, ignoring', address)
  }
  async commit() {
    //console.log('commit requested, ignoring')
  }
  async revert() {
    //console.log('revert requested, ignoring')
  }
  getContractCode(address: Address): Buffer {
    return this.contractCode[address.toString()]
  }
  putContractCode(address: Address, value: Buffer) {
    this.contractCode[address.toString()] = value
  }
  storageLoad(
    address: Address,
    key: Buffer,
    original: boolean,
  ): Buffer {
    //console.log('storageLoad', address, key)
    let k = address.toString() + key.toString()
    let o = this.storage[k]
    if (o) return o
    return Buffer.alloc(0)
  }
  async storageStore(
    address: Address,
    key: Buffer,
    value: Buffer,
  ): Promise<void> {
    //console.log('storageStore', address, key, value)
    let k = address.toString() + key.toString()
    this.storage[k] = value
  }

  addWarmedAddress(_address: Buffer): void {}
}

export function createWebEVM() {
  return new EVM({
    common,
    eei: new LocalEEI() as any
  })
}


