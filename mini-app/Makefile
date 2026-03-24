# Makefile
include /env.mak
EXEC= examplePkg
OBJS= examplePkg.o
all: $(EXEC)
$(EXEC): $(OBJS)
    $(CC) $(CFLAGS) $< -o $@ $(LDFLAGS)
install: $(EXEC)
    mkdir -p $(DESTDIR)/usr/bin/
    install $< $(DESTDIR)/usr/bin/
clean:
    rm -rf *.o $(EXEC)
