function updateNestedValue(object, keys, value) {
    const [key, ...rest] = keys.split('.');

    if (rest.length) {
        updateNestedValue(object[key], rest.join('.'), value);
    } else {
        object[key] = value;
    }
}

export function updateValue(state, data) {
    if (!Array.isArray(data)) {
        data = [{ ...data }];
    }
    data.forEach(({ key, value }) => {
        updateNestedValue(state, key, value);
    });
}
