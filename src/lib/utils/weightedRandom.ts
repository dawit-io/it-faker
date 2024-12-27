import type { WeightedItem } from "../types/types";

export class WeightedRandomSelector<T> {
    private readonly SMALL_DATASET_THRESHOLD = 100;
    private isSmallDataset: boolean;
    private fastAccessArray?: T[];
    private items?: Array<{
        value: T;
        weight: number;
        accumulatedWeight: number;
    }>;
    private totalWeight = 0;

    /**
     * Creates a WeightedRandomSelector that respects actual weights
     * @param items Array of items with weights
     * @param isSorted boolean indicating if items are pre-sorted
     */
    constructor(items: WeightedItem<T>[], isSorted: boolean = false) {
        if (items.length === 0) {
            throw new Error("Items array cannot be empty");
        }

        this.isSmallDataset = items.length <= this.SMALL_DATASET_THRESHOLD;

        if (this.isSmallDataset) {
            this.initializeSmallDataset(items);
        } else {
            this.initializeLargeDataset(items, isSorted);
        }
    }

    private initializeSmallDataset(items: WeightedItem<T>[]): void {
        this.fastAccessArray = [];
        items.forEach(item => {
            // For small datasets, we keep direct representation
            this.fastAccessArray!.push(...Array(item.weight).fill(item.value));
        });
    }

    /**
     * Initialization for large datasets using cumulative weights
     */
    private initializeLargeDataset(items: WeightedItem<T>[], isSorted: boolean): void {
        this.items = [];
        let accumulatedWeight = 0;

        // If not sorted, sort by descending weight to optimize search
        const workingItems = isSorted ? items : [...items].sort((a, b) => b.weight - a.weight);

        workingItems.forEach(item => {
            accumulatedWeight += item.weight;
            this.items!.push({
                value: item.value,
                weight: item.weight,
                accumulatedWeight
            });
        });

        this.totalWeight = accumulatedWeight;
    }

    /**
     * Returns a random item respecting actual weights
     */
    public select(): T {
        if (this.isSmallDataset && this.fastAccessArray) {
            return this.fastAccessArray[Math.floor(Math.random() * this.fastAccessArray.length)];
        }

        const randomWeight = Math.random() * this.totalWeight;

        // Binary search to find element with correct cumulative weight
        return this.binarySearch(randomWeight);
    }

    private binarySearch(targetWeight: number): T {
        let left = 0;
        let right = this.items!.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const item = this.items![mid];

            if (mid === 0 || (this.items![mid - 1].accumulatedWeight <= targetWeight &&
                item.accumulatedWeight > targetWeight)) {
                return item.value;
            }

            if (item.accumulatedWeight <= targetWeight) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        // Fallback to first element (this should never happen)
        return this.items![0].value;
    }

    public selectMultiple(count: number): T[] {
        return Array.from({ length: count }, () => this.select());
    }
}