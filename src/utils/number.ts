export function floatNumber( num: string): number{
    const r = /([1-9][0-9]*[eE][1-9][0-9]*|(([1-9][0-9]*\.)|(\.[0-9]+))([0-9]*)?([eE][-+]?[1-9][0-9]*)?)/gis;
    const m =  num.match(r);
    return m.length > 0 ? Number(m[0]) : NaN;
}