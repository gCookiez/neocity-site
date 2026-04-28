export function intToDateFormat(integer) {
    return new Date(integer).toJSON().substr(0,10);
}