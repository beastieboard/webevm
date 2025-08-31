import { Address } from '@ethereumjs/util';
import { PrecompileFunc, PrecompileInput } from './types';
import { Common } from '@ethereumjs/common';
interface Precompiles {
    [key: string]: PrecompileFunc;
}
declare const ripemdPrecompileAddress = "0000000000000000000000000000000000000003";
declare const precompiles: Precompiles;
type DeletePrecompile = {
    address: Address;
};
type AddPrecompile = {
    address: Address;
    function: PrecompileFunc;
};
type CustomPrecompile = AddPrecompile | DeletePrecompile;
declare function getActivePrecompiles(common: Common, customPrecompiles?: CustomPrecompile[]): Map<string, PrecompileFunc>;
export { AddPrecompile, CustomPrecompile, DeletePrecompile, getActivePrecompiles, PrecompileFunc, PrecompileInput, precompiles, ripemdPrecompileAddress, };
//# sourceMappingURL=index.d.ts.map