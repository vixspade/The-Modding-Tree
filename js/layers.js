addLayer("am", {
    name: "abstractmatter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text", function() { return 'You have ' + format(player.points) + ' points' }],
        "blank",
        "milestones",
        "upgrades"
    ],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "abstract matter", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Abstract matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Begin.",
            description: "add 1 AE/second",
            cost: new Decimal(0),
            unlocked() {
                return true
            },
        },
        12: {
            title: "double the money",
            description: "x2 AE gain",
            cost: new Decimal(2),
            unlocked() {
                return hasUpgrade(this.layer, "11")
            },
        },
        13: {
            title: "self-replication",
            description: "20th root of (AE + 1) boosts AE gain",
            cost: new Decimal(3),
            unlocked() {
                return hasUpgrade(this.layer, "12")
            },
            effect() {
                return (player.points.add(1).pow(0.05))
            },
            effectDisplay() {
                let apboost = upgradeEffect(this.layer, this.id)
                return "x"+format(apboost)
                },
        },
        14: {
            title: "catalyst",
            description: "10th root of (abstract matter + 1) boosts AE gain",
            cost: new Decimal(5),
            unlocked() {
                return hasUpgrade(this.layer, "13")
            },
            effect() {
                return (player.am.points.add(1).pow(0.1))
            },
            effectDisplay() {
                let apboost = upgradeEffect(this.layer, this.id)
                return "x"+format(apboost)
                },
        },
    },
    layerShown(){return true}
})
