var colorPointsGamut_A = [
    [0.703, 0.296],
    [0.214, 0.709],
    [0.139, 0.081]
]
var colorPointsGamut_B = [
    [0.674, 0.322],
    [0.408, 0.517],
    [0.168, 0.041]
]
var colorPointsGamut_C = [
    [0.692, 0.308],
    [0.17, 0.7],
    [0.153, 0.048]
]
var colorPointsDefault = [
    [1.0, 0.0],
    [0.0, 1.0],
    [0.0, 0.0]
]

var GAMUT_A_BULBS_LIST = [
    'LLC001',
    'LLC005',
    'LLC006',
    'LLC007',
    'LLC010',
    'LLC011',
    'LLC012',
    'LLC014',
    'LLC013',
    'LST001'
]
var GAMUT_B_BULBS_LIST = [
    'LCT001',
    'LCT002',
    'LCT003',
    'LCT004',
    'LLM001',
    'LCT005',
    'LCT006',
    'LCT007'
]
var GAMUT_C_BULBS_LIST = [
    'LCT010',
    'LCT011',
    'LCT012',
    'LCT014',
    'LCT015',
    'LCT016',
    'LLC020',
    'LST002'
]
var MULTI_SOURCE_LUMINAIRES = [
    'HBL001',
    'HBL002',
    'HBL003',
    'HIL001',
    'HIL002',
    'HEL001',
    'HEL002'
]

export default {
    /**
     * Calculate XY color points for a given RGB value.
     * @param {number} red RGB red value (0-255)
     * @param {number} green RGB green value (0-255)
     * @param {number} blue RGB blue value (0-255)
     * @param {string} model Hue bulb model
     * @returns {number[]}
     */
    calculateXY: function(red, green, blue, model) {
        // Convert rgb values to a value between 0 and 1
        // So the RGB color (255, 0, 100) becomes (1.0, 0.0, 0.39)
        red = red / 255
        green = green / 255
        blue = blue / 255

        // Apply a gamma correction to the RGB values, which makes the color more vivid and
        // more the like the color displayed on the screen of your device
        let r =
            red > 0.04045
                ? Math.pow((red + 0.055) / 1.055, 2.4000000953674316)
                : red / 12.92
        let g =
            green > 0.04045
                ? Math.pow((green + 0.055) / 1.055, 2.4000000953674316)
                : green / 12.92
        let b =
            blue > 0.04045
                ? Math.pow((blue + 0.055) / 1.055, 2.4000000953674316)
                : blue / 12.92

        // Convert the RGB values to XYZ using the Wide RGB D65 conversion formula
        let X = r * 0.649926 + g * 0.103455 + b * 0.197109
        let Y = r * 0.234327 + g * 0.743075 + b * 0.022598
        let Z = r * 0.0 + g * 0.053077 + b * 1.035763

        // Calculate the xy values from the XYZ values
        let xy = [X / (X + Y + Z), Y / (X + Y + Z)]
        if (isNaN(xy[0])) {
            xy[0] = 0.0
        }

        // Check if the found xy value is within the color gamut of the light
        var colorPoints = colorPointsForModel(model)
        var inReachOfLamps = checkPointInLampsReach(xy, colorPoints)
        if (!inReachOfLamps) {
            // Calculate the closest point on the color gamut triangle and use that as xy value
            var pAB = getClosestPointToPoints(
                colorPoints[0],
                colorPoints[1],
                xy
            )
            var pAC = getClosestPointToPoints(
                colorPoints[2],
                colorPoints[0],
                xy
            )
            var pBC = getClosestPointToPoints(
                colorPoints[1],
                colorPoints[2],
                xy
            )
            var dAB = getDistanceBetweenTwoPoints(xy, pAB)
            var dAC = getDistanceBetweenTwoPoints(xy, pAC)
            var dBC = getDistanceBetweenTwoPoints(xy, pBC)
            var lowest = dAB
            var closestPoint = pAB
            if (dAC < dAB) {
                lowest = dAC
                closestPoint = pAC
            }

            if (dBC < lowest) {
                closestPoint = pBC
            }

            xy[0] = closestPoint[0]
            xy[1] = closestPoint[1]
        }

        xy[0] = precision(xy[0])
        xy[1] = precision(xy[1])
        return xy
    },

    calculateRGB: function(xy, bri, model) {
        // Check if the found xy value is within the color gamut of the light
        var colorPoints = colorPointsForModel(model)
        var inReachOfLamps = checkPointInLampsReach(xy, colorPoints)
        if (!inReachOfLamps) {
            // Calculate the closest point on the color gamut triangle and use that as xy value
            var pAB = getClosestPointToPoints(
                colorPoints[0],
                colorPoints[1],
                xy
            )
            var pAC = getClosestPointToPoints(
                colorPoints[2],
                colorPoints[0],
                xy
            )
            var pBC = getClosestPointToPoints(
                colorPoints[1],
                colorPoints[2],
                xy
            )
            var dAB = getDistanceBetweenTwoPoints(xy, pAB)
            var dAC = getDistanceBetweenTwoPoints(xy, pAC)
            var dBC = getDistanceBetweenTwoPoints(xy, pBC)
            var lowest = dAB
            var closestPoint = pAB
            if (dAC < dAB) {
                lowest = dAC
                closestPoint = pAC
            }

            if (dBC < lowest) {
                closestPoint = pBC
            }

            xy[0] = closestPoint[0]
            xy[1] = closestPoint[1]
        }

        xy[0] = precision(xy[0])
        xy[1] = precision(xy[1])

        // Calculate XYZ values
        let x = xy[0] // the given x value
        let y = xy[1] // the given y value
        let z = 1.0 - x - y
        let Y = bri // The given brightness value
        let X = (Y / y) * x
        let Z = (Y / y) * z

        // Convert to RGB using Wide RGB D65 conversion (THIS IS A D50 conversion currently)
        let r = X * 1.4628067 - Y * 0.1840623 - Z * 0.2743606
        let g = -X * 0.5217933 + Y * 1.4472381 + Z * 0.0677227
        let b = X * 0.0349342 - Y * 0.096893 + Z * 1.2884099

        // Apply reverse gamma correction
        r =
            r <= 0.0031308
                ? 12.92 * r
                : 1.055 * Math.pow(r, 1.0 / 2.4000000953674316) - 0.055
        g =
            g <= 0.0031308
                ? 12.92 * g
                : 1.055 * Math.pow(g, 1.0 / 2.4000000953674316) - 0.055
        b =
            b <= 0.0031308
                ? 12.92 * b
                : 1.055 * Math.pow(b, 1.0 / 2.4000000953674316) - 0.055

        let maxValue = Math.max(r, g, b)
        r /= maxValue
        g /= maxValue
        b /= maxValue

        // Convert the RGB values these are now between 0.0 and 1.0
        let red = r * 255
        let green = g * 255
        let blue = b * 255

        return {
            r: red,
            g: green,
            b: blue
        }
    },

    RGBToHEX: function(r, g, b) {
        r = Math.round(r).toString(16)
        g = Math.round(g).toString(16)
        b = Math.round(b).toString(16)

        if (r.length < 2) r = '0' + r
        if (g.length < 2) g = '0' + g
        if (b.length < 2) b = '0' + r
        let hex = '#' + r + g + b

        return hex
    }
}

function colorPointsForModel(model) {
    if (model == null) {
        model = ' '
    }

    if (
        GAMUT_B_BULBS_LIST.indexOf(model) == -1 &&
        MULTI_SOURCE_LUMINAIRES.indexOf(model) == -1
    ) {
        if (GAMUT_A_BULBS_LIST.indexOf(model) >= 0) {
            return colorPointsGamut_A
        } else if (GAMUT_C_BULBS_LIST.indexOf(model) >= 0) {
            return colorPointsGamut_C
        } else {
            return colorPointsDefault
        }
    } else {
        return colorPointsGamut_B
    }
}

function checkPointInLampsReach(point, colorPoints) {
    if (point != null && colorPoints != null) {
        var red = colorPoints[0]
        var green = colorPoints[1]
        var blue = colorPoints[2]
        var v1 = [green[0] - red[0], green[1] - red[1]]
        var v2 = [blue[0] - red[0], blue[1] - red[1]]
        var q = [point[0] - red[0], point[1] - red[1]]
        var s = crossProduct(q, v2) / crossProduct(v1, v2)
        var t = crossProduct(v1, q) / crossProduct(v1, v2)
        return s >= 0.0 && t >= 0.0 && s + t <= 1.0
    } else {
        return false
    }
}

function crossProduct(point1, point2) {
    return point1[0] * point2[1] - point1[1] * point2[0]
}

function getClosestPointToPoints(pointA, pointB, pointP) {
    if (pointA != null && pointB != null && pointP != null) {
        var pointAP = [pointP[0] - pointA[0], pointP[1] - pointA[1]]
        var pointAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]]
        var ab2 = pointAB[0] * pointAB[0] + pointAB[1] * pointAB[1]
        var apAb = pointAP[0] * pointAB[0] + pointAP[1] * pointAB[1]
        var t = apAb / ab2
        if (t < 0.0) {
            t = 0.0
        } else if (t > 1.0) {
            t = 1.0
        }

        return [pointA[0] + pointAB[0] * t, pointA[1] + pointAB[1] * t]
    } else {
        return null
    }
}

function getDistanceBetweenTwoPoints(pointA, pointB) {
    var dx = pointA[0] - pointB[0]
    var dy = pointA[1] - pointB[1]
    var dist = Math.sqrt(dx * dx + dy * dy)
    return dist
}

function precision(d) {
    return Math.round(10000.0 * d) / 10000.0
}
