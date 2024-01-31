// inspired by some scratchx extension
// by nmsderp

class ISSLocationExtension {
    getInfo() {
        return {
            id: 'ISSLocation',
            name: 'ISS Location',
            blocks: [
                {
                    opcode: 'getISSCoordinate',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'get [LATORLONG] of the ISS',
                    arguments: {
                        LATORLONG: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'LATORLONGMENU',
                            defaultValue: 'latitude',
                        },
                    },
                },
            ],
            menus: {
                LATORLONGMENU: {
                    acceptReporters: false,
                    items: ['latitude', 'longitude'],
                },
            },
        };
    }

    async getISSCoordinate(args) {
        const coordinate = args.COORDINATE;
        try {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            if (!response.ok) {
                throw new Error(`Failed to fetch ISS location: ${response.statusText}`);
            }
            const data = await response.json();
            return coordinate === 'latitude' ? data.latitude : data.longitude;
        } catch (error) {
            console.error('Error fetching ISS location:', error);
            return 'Failed to fetch ISS location 😭';
        }
    }
}

Scratch.extensions.register(new ISSLocationExtension());
