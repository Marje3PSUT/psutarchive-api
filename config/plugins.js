module.exports = {
    "rest-cache": {
        config: {
            provider: {
                name: "memory",
                options: {
                    max: 32767,
                    maxAge: 3600,
                },
            },
            strategy: {
                debug: true,
                enableXCacheHeaders: true,
                contentTypes: [
                    "api::category.category",
                    "api::course.course",
                    "api::resource.resource",
                ],
            },
        },
    },
    "audit-log-marje3": {
        enabled: true,
        config: {
            deletion: {
                enabled: true,
                frequency: "logAge",
                options: {
                    value: 2,
                    interval: "week",
                }
            },
            filters: {
                endpoint: {
                    exclude: ["/content-manager/uid", "/admin/renew-token"],
                },
                status: {},
                method: {
                    exclude: ["GET"],
                },
            },
            redactedValues: [
                "password",
                "token",
                "firstname",
                "lastname",
                "username",
            ],
        }
    }
};
