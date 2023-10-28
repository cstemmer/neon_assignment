function deviceConfig(device) {
    if (device === 'desktop') {
        return {
            viewportWidth: 1280,
            viewportHeight: 800,
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            isMobile: false
        }
    } if (device === 'mobile') {
        return {
            viewportWidth: 375,
            viewportHeight: 667,
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/112.0.5615.46 Mobile/15E148 Safari/604.1',
            isMobile: true
        }
    }
    throw new Error(`Unsupported device '${device}'`)
}

module.exports = async (on, config) => {
    const deviceConf = deviceConfig(config.env.device)

    config = Object.assign(config, deviceConf)

    return config
}