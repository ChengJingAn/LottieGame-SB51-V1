export default async function loadJson(url) {
    const jsonData = await fetch('./lottieFiles/' + url)
        .then((r) => r.json())
        .then((data) => {
            return data;
        })
    return jsonData
}
