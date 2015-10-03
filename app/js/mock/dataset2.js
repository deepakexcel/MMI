define([], function () {
    return {
        "entities": {
            "S1": { "name": "sample 1", color: '#06538b' },
            "S2": { "name": "sample 2", color: '#0bc1ea' },
            "S3": { "name": "sample 3", color: '#6970b0' },
            "S4": { "name": "another sample", color : '#6fc3e4' },
            "S5": { "name": "test", color : '#d9effc' }
        },
        "relations": [
            { "source": "S1", "target": "S4", "weight": "1" },
            { "source": "S1", "target": "S2", "weight": "1" },
            { "source": "S1", "target": "S3", "weight": "1" },
            { "source": "S1", "target": "S5", "weight": "1" },

            { "source": "S2", "target": "S1", "weight": "1" },
            { "source": "S2", "target": "S3", "weight": "1" },
            { "source": "S2", "target": "S2", "weight": "1" },
            { "source": "S2", "target": "S5", "weight": "1" },

            { "source": "S3", "target": "S4", "weight": "1" },
            { "source": "S3", "target": "S2", "weight": "1" },
            { "source": "S3", "target": "S5", "weight": "1" },

            { "source": "S4", "target": "S1", "weight": "1" },
            { "source": "S4", "target": "S2", "weight": "1" },
            { "source": "S4", "target": "S3", "weight": "1" },
            { "source": "S4", "target": "S4", "weight": "1" },

            { "source": "S5", "target": "S2", "weight": "1" },
            { "source": "S5", "target": "S1", "weight": "1" },
            { "source": "S5", "target": "S3", "weight": "1" }
        ]
    }

});
