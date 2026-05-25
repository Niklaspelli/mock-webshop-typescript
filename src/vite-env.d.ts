interface ImportMetaEnv {
  readonly VITE_GET_PRODUCTS_URL: string;
  readonly VITE_GET_ORDER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
