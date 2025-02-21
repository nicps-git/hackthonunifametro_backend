export const defaultResponseView = (data: any) => ({
  data,
});

export const cloneDeep = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (Array.isArray(obj)) {
    return obj.map(cloneDeep);
  }

  const clonedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = cloneDeep(obj[key]);
    }
  }

  return clonedObj;
};

export const removeField = (obj: any, field: string): void => {
  const parts = field.split('.');
  const currentField = parts.shift();

  if (!currentField) {
    return;
  }

  if (parts.length === 0) {
    delete obj[currentField];
  } else if (obj[currentField]) {
    removeField(obj[currentField], parts.join('.'));

    if (Object.keys(obj[currentField]).length === 0) {
      delete obj[currentField];
    }
  }
};

export const customOneView = <T>(fields: string, data: T | null) => {
  if (!data) {
    return defaultResponseView(null);
  }

  const result = cloneDeep(data);
  const fieldArray = fields.split(',').map((field) => field.trim());

  for (const field of fieldArray) {
    removeField(result, field);
  }

  return defaultResponseView(result);
};

export const customManyView = (fields: string, data: any[]) => {
  if (data.length > 0) {
    const resultDataView = data.map(
      (value) => customOneView(fields, value).data,
    );

    return defaultResponseView(resultDataView);
  }

  return defaultResponseView([]);
};

export const customView = (data: any, fields?: string) => {
  if (fields) {
    if (Array.isArray(data)) {
      return customManyView(fields, data);
    }

    if (typeof data === 'boolean') {
      return defaultResponseView(data);
    }

    return customOneView(fields, data);
  }

  return defaultResponseView(data);
};
