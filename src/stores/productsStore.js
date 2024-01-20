// stores/productsStore.js
import {BACK_BASE_URL} from "/src/constants";
import { defineStore } from 'pinia'

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        products: [],
        product: null,
        loading: false,
        error: null
    }),
    getters: {

    },
    actions: {
        // Si quisiéramos todos los productos
        async fetchProducts() {
            this.products = []
            this.loading = true
            try {
                this.products = await fetch(`${BACK_BASE_URL}/wp-json/wc/v3/products`)
                    .then((response) => response.json())
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async fetchProductInfo(id) {
            this.product = null;
            this.loading = true;
            // Aquí estos tokens deberían de ir en variables de entorno
            const consumerKey = "ck_0eb08049de190faf7bbe28bcb82bc3e7c6d510f4";
            const consumerSecret = "cs_c7381e4cde2b93e9b4ca7b57d002018d48d4c63b";
            try {
                const response = await fetch(`${BACK_BASE_URL}/wp-json/wc/v3/products/${id}`, {
                    headers: {
                        'Authorization': `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del producto.');
                }
                this.product = await response.json();
                this.products.push(this.product);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
    }
})