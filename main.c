#include "webui.h"

void exit_web(webui_event_t* e) {
	webui_exit();
}

void jyanken_judgment(webui_event_t* e) {
	long long int computer = webui_get_int_at(e, 0);
	long long int human = webui_get_int_at(e, 1);
	long long int judgment = (computer - human + 3) % 3;
	printf("jyanken: %lld %lld %lld\n", computer, human, judgment);

	webui_return_int(e, judgment);
}


int main() {
	size_t my_window = webui_new_window();

	webui_bind(my_window, "exit", exit_web);
	webui_bind(my_window, "jyanken_judgment", jyanken_judgment);

	webui_show(my_window, "./index.html");

	webui_wait();
	webui_clean();

	return 0;
}

#if defined(_MSC_VER)
int APIENTRY WinMain(HINSTANCE hInst, HINSTANCE hInstPrev, PSTR cmdline, int cmdshow) { return main(); }
#endif
