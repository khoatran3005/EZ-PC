export class CreateComputerDto {
    id: string;
    name: string;
    company: string;
    os: string;
    processor: {
        company: string;
        type: string;
        model: string;
    };
    display: number;
    graphics_card: {
        company: string;
        type: string;
        model: string;
    };
    ram: number;
    dimensions: {
        dimensions: string;
        weight: number;
    };
    storage: {
        space: number;
        type: string;
    };
    image: string[];
    price: number;
    tag: string[];
}

