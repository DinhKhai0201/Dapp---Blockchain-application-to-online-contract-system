export var render = function () {
    window.ethereum.on("accountsChanged", function (accounts) {
        window.location.reload();
    });
};