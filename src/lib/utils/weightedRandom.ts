import { WeightedItem } from "../types/types";

export class WeightedRandomSelector<T> {
    private readonly SMALL_DATASET_THRESHOLD = 100; // Threshold for small dataset optimization
    private isSmallDataset: boolean;
    private fastAccessArray?: T[]; // For small datasets
    private clusters?: {
        high: T[];    // top 20%
        medium: T[];  // middle 60%
        low: T[];     // bottom 20%
    };

    /**
     * Creates an optimized WeightedRandomSelector based on dataset size
     * @param items Array of items with weights
     */
    constructor(items: WeightedItem<T>[]) {
        this.isSmallDataset = items.length <= this.SMALL_DATASET_THRESHOLD;

        if (this.isSmallDataset) {
            this.initializeSmallDataset(items);
        } else {
            this.initializeLargeDataset(items);
        }
    }

    /**
     * Optimized initialization for small datasets
     * Creates a flat array with repeated elements based on weights
     */
    private initializeSmallDataset(items: WeightedItem<T>[]): void {
        this.fastAccessArray = [];
        
        // Normalize weights to smaller numbers for small datasets
        const minWeight = Math.min(...items.map(item => item.weight));
        const normalizer = minWeight < 1 ? 1 : Math.ceil(minWeight);

        items.forEach(item => {
            const occurrences = Math.max(1, Math.round(item.weight / normalizer));
            this.fastAccessArray!.push(...Array(occurrences).fill(item.value));
        });
    }

    /**
     * Initialization for large datasets using clustering
     */
    private initializeLargeDataset(items: WeightedItem<T>[]): void {
        const sorted = [...items].sort((a, b) => b.weight - a.weight);
        const total = items.length;

        this.clusters = {
            high: sorted.slice(0, total * 0.2).map(item => item.value),
            medium: sorted.slice(total * 0.2, total * 0.8).map(item => item.value),
            low: sorted.slice(total * 0.8).map(item => item.value)
        };
    }

    /**
     * Returns a random item based on weights
     */
    public select(): T {
        if (this.isSmallDataset && this.fastAccessArray) {
            return this.fastAccessArray[Math.floor(Math.random() * this.fastAccessArray.length)];
        }

        // Large dataset selection logic
        const rand = Math.random();
        let cluster: T[];

        if (rand < 0.6) {
            cluster = this.clusters!.high;
        } else if (rand < 0.9) {
            cluster = this.clusters!.medium;
        } else {
            cluster = this.clusters!.low;
        }

        return cluster[Math.floor(Math.random() * cluster.length)];
    }

    /**
     * Returns multiple random items
     * @param count Number of items to return
     */
    public selectMultiple(count: number): T[] {
        return Array.from({ length: count }, () => this.select());
    }
}