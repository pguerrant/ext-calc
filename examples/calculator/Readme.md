# Calculator/app

This folder contains the javascript files for the application.

# Calculator/resources

This folder contains static resources (typically an `"images"` folder as well).

# Calculator/overrides

This folder contains override classes. All overrides in this folder will be 
automatically included in application builds if the target class of the override
is loaded.

# Calculator/sass/etc

This folder contains misc. support code for sass builds (global functions, 
mixins, etc.)

# Calculator/sass/src

This folder contains sass files defining css rules corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'Calculator'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in Calculator/.sencha/app/sencha.cfg. 

# Calculator/sass/var

This folder contains sass files defining sass variables corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'Calculator'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in Calculator/.sencha/app/sencha.cfg. 
