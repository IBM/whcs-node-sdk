
# For each service belonging to your project, add a command like the commented out example below.
# Replace "service-name/v1.ts" with the source directory name and version for the service.
./node_modules/.bin/typedoc --mode file --theme ./scripts/typedoc/theme --excludeExternals \
    --out .doc \
    ./annotator-for-clinical-data/v1.ts \
    ./insights-for-medical-literature/v1.ts \ 
    --target "ES5"
