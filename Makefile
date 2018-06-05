.PHONY: all watch

all:
	sass css/main.scss\:css/main.css

watch:
	sass --watch css/main.scss\:css/main.css
