var ViewModelDataServ = /** @class */ (function () {
    function ViewModelDataServ() {
        this.entityName = 'table_one2'; //name of the collection in FS
        this.dataSourceType = 'real'; //real or fake
    }
    ViewModelDataServ.prototype.read = function (ctx) {
        console.log('--ViewModelDataServ reading...', ctx);
        if (this.dataSourceType == 'fake') {
            var rows = [
                { id: 1, col1: " Bob11", col2: "Bob12" },
                { id: 2, col1: " Bob21", col2: "Bob22" },
                { id: 3, col1: " Bob31", col2: "Bob32" }
            ];
            this._disE(rows, ctx);
            return;
        }
        var ref = db1.collection(this.entityName);
        var _this = this;
        ref
            .get()
            .then(function (querySnapshot) {
            var rows = [];
            querySnapshot.forEach(function (doc) {
                var row = doc.data();
                row['id'] = doc.id;
                rows.push(row);
            });
            _this._disE(rows, ctx);
        })["catch"](function (error) {
            console.log("Error getting documents: ", error);
            //if (reject) reject(error)
        });
    };
    ViewModelDataServ.prototype._disE = function (data, ctx) {
        console.log('--_disE data: ', data);
        var msg = {
            data: data,
            ctx: ctx
        };
        dispatchEvent(new CustomEvent('ViewModelDataServEvent', { detail: msg })); // so when this event dispatched, call the _onData function, from the listener
    };
    ViewModelDataServ.prototype.addModListener = function (binder) {
        console.log('--addModListener binder: ', binder);
        addEventListener('ViewModelDataServEvent', binder._onData); //add a listener, and a callback function when the event will be dispatched
    };
    ViewModelDataServ.prototype.add = function (row, resolve, reject) {
        if (row.id)
            delete row.id; // that should not be there on add
        var newPK = db1.collection(this.entityName).doc(); // make PK
        newPK.set(row) // insert
            .then(function () {
            console.log('successful');
            if (resolve)
                resolve(1);
        })["catch"](function (error) {
            console.error('oops', error);
            if (reject)
                reject(error);
        });
        console.log(newPK);
        return newPK;
    }; //()
    return ViewModelDataServ;
}());
