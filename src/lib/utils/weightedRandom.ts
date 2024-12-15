import { WeightedItem } from "../types/types";

export class WeightedRandomSelector<T> {
    private readonly SMALL_DATASET_THRESHOLD = 100;
    private isSmallDataset: boolean;
    private fastAccessArray?: T[];
    private items?: Array<{
        value: T;
        weight: number;
        accumulatedWeight: number;
    }>;
    private totalWeight: number = 0;

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
            // Per i dataset piccoli, manteniamo la rappresentazione diretta
            this.fastAccessArray!.push(...Array(item.weight).fill(item.value));
        });
    }

    /**
     * Initialization for large datasets using cumulative weights
     */
    private initializeLargeDataset(items: WeightedItem<T>[], isSorted: boolean): void {
        this.items = [];
        let accumulatedWeight = 0;

        // Se non è ordinato, ordiniamo per peso decrescente per ottimizzare la ricerca
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

        // Selezione basata su peso effettivo
        const randomWeight = Math.random() * this.totalWeight;
        
        // Binary search per trovare l'elemento con il peso accumulato giusto
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

        // Fallback al primo elemento (non dovrebbe mai accadere)
        return this.items![0].value;
    }

    public selectMultiple(count: number): T[] {
        return Array.from({ length: count }, () => this.select());
    }
}