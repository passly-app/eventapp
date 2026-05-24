RUN:=yarn

NAME:=eventapp

-include .env
export NPM_TOKEN

# STYLE BOX #
ERROR_BOX=\x1b[41m
SUCCESS_BOX=\x1b[42m
RESET_BOX=\x1b[0m
WARN_BOX=\x1b[30;43m

# STYLE COLOR #
ERROR_TEXT=\x1b[31m
SUCCESS_TEXT=\x1b[32m
RESET_TEXT=\x1b[0m
WARN_TEXT=\x1b[33m

# ------------------------------------------------------------------------------------ #

# Função para executar comandos dentro do workspace
define run_in_workspace
	@echo ------------------------------------------------------------------------------;
	@printf "${WARN_BOX} RUNNING ${RESET_BOX}: $(1) - $(2) $(3)\n";
	@echo ;
	@$(RUN) workspace @$(NAME)/$(1) $(2) $(3)

	@if [ $$? -eq 0 ]; then \
		printf "${SUCCESS_BOX} SUCCESS ${RESET_BOX}: $(1) - $(2) $(3)\n"; \
		echo ------------------------------------------------------------------------------; \
	fi
endef

# Extrair parâmetros dos argumentos posicionais
.PHONY: run
run:
	$(eval PROJECT := $(word 2, $(MAKECMDGOALS)))
	$(eval CMD := $(wordlist 3, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS)))
	$(call run_in_workspace,$(PROJECT),$(CMD))

# Para evitar que make tente interpretar os argumentos como alvos
%:
	@:

# ----------------------------------------------- #

install:
	$(RUN)

setup:
	make clean-modules
	$(RUN) install
	make run tokens build

define delete_dependencies
	@echo delete_dependencies $(1)
	rm -Rf ./packages/$(1)/node_modules
endef

clean-modules:
	rm -Rf ./node_modules
	rm -Rf yarn.lock
	$(call delete_dependencies,apps/sso)
	$(call delete_dependencies,core)
	$(call delete_dependencies,modules)
	$(call delete_dependencies,toolkit)
	@printf "${SUCCESS_TEXT}Dependencies deleted successfully ${RESET_TEXT}\n";

# -------------------- EMULADOR ------------------- #

# CUIDADO: Este comando irá sobrescrever o path mock
db-write:
	@cd packages/db && firebase emulators:start --import ./mock --export-on-exit ./mock

db:
	@printf "${WARN_TEXT} Starting Firestore emulator...${RESET_TEXT}"
	@cd packages/db && firebase emulators:start --import ./mock