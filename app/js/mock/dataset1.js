define([], function () {
    return {
        "entities": {
            "S1": {"name": "Source 1"},
            "S2": {"name": "Source 2"},
            "S3": {"name": "Source 3"}
        },
        "relations": [
            {
                "source": "S1", "target": "S2", "weight": "134"
            },
            {
                "source": "S1", "target": "S3", "weight": "134"
            },
            {
                "source": "S2", "target": "S1", "weight": "123"
            },
            {
                "source": "S2", "target": "S3", "weight": "123"
            },
            {
                "source": "S3", "target": "S1", "weight": "134"
            },
            {
                "source": "S3", "target": "S2", "weight": "34"
            }
        ]
    }
});
