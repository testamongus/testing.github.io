// made by nmsderp
// inspired by some scratchx extension

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
                {
                    opcode: 'whenISSPassesOverLocation',
                    blockType: Scratch.BlockType.HAT,
                    text: 'when ISS passes over [LOCATION]',
                    arguments: {
                        LOCATION: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'LOCATIONMENU',
                            defaultValue: 'New York',
                        },
                    },
                },
                {
                    opcode: 'getDistanceToISS',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'get distance to ISS from latitude [LATITUDE] longitude [LONGITUDE]',
                    arguments: {
                        LATITUDE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '40.7128',
                        },
                        LONGITUDE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '-74.0060',
                        },
                    },
                },
            ],
            menus: {
                LATORLONGMENU: {
                    acceptReporters: false,
                    items: ['latitude', 'longitude'],
                },
                // time for geography lessons with nolan!
                LOCATIONMENU: {
                    acceptReporters: false,
                    items: [
                        'New York', 'Cincinati', 'Detroit', 'London', 'Paris', 'Tokyo', 'Sydney', // those are cities
                        'United States', 'United Kingdom', 'France', 'Japan', 'Australia' // those are countries
                    ],
                },
            },
        };
    }

    async getISSCoordinate(args) {
        const coordinate = args.LATORLONG;
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

    whenISSPassesOverLocation(args, util) {
        const location = args.LOCATION.toLowerCase();
        setInterval(async () => {
            try {
                const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                if (!response.ok) {
                    throw new Error(`Failed to fetch ISS location: ${response.statusText}`);
                }
                const data = await response.json();
                const { latitude, longitude } = data;
                const ISSLocation = { latitude, longitude };
                if (this.isISSOverLocation(ISSLocation, location)) {
                    Scratch.vm.runtime.startHats('event_whenisspassesoverlocation');
                }
            } catch (error) {
                console.error('Error fetching ISS location:', error);
            }
        }, 60000); // when 1 minute :0
    }

    isISSOverLocation(ISSLocation, location) {
        // implement stuff to check if ISS is passing over given location, it is silly 
        return ISSLocation.latitude.toFixed(2) === location || ISSLocation.longitude.toFixed(2) === location;
    }

    async getDistanceToISS(args) {
        const { LATITUDE, LONGITUDE } = args;
        try {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            if (!response.ok) {
                throw new Error(`Failed to fetch ISS location: ${response.statusText}`);
            }
            const data = await response.json();
            const distance = Math.abs(data.latitude - parseFloat(LATITUDE)) + Math.abs(data.longitude - parseFloat(LONGITUDE));
            return distance.toFixed(2);
        } catch (error) {
            console.error('Error fetching ISS location:', error);
            return 'Failed to fetch ISS location 😭';
        }
    }
}

Scratch.extensions.register(new ISSLocationExtension());
