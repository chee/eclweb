// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../xterm

declare module 'xterm-pty' {
    export * from "xterm-pty/lineDiscipline";
    export * from "xterm-pty/termios";
    export * from "xterm-pty/utils";
    export * from "xterm-pty/pty";
    export * from "xterm-pty/ttyServer";
}

declare module 'xterm-pty/lineDiscipline' {
    import { Signal } from "xterm-pty/pty";
    import { Termios } from "xterm-pty/termios";
    import { Event } from "xterm-pty/eventEmitter";
    export class LineDiscipline {
        readonly onWriteToLower: Event<number[]>;
        readonly onWriteToUpper: Event<number[]>;
        readonly onSignalToUpper: Event<Signal>;
        readonly onFlowActivated: Event<void>;
        readonly onFlowDeactivated: Event<void>;
        constructor();
        get flow(): boolean;
        get termios(): Termios;
        set termios(T: Termios);
        writeFromLower(arg: number[] | string): void;
        writeFromUpper(arg: number[] | string): void;
    }
    export interface LineDiscipline {
        readonly onWriteToLower: Event<number[]>;
        readonly onWriteToUpper: Event<number[]>;
        readonly onSignalToUpper: Event<Signal>;
        readonly onFlowActivated: Event<void>;
        readonly onFlowDeactivated: Event<void>;
        flow: boolean;
        termios: Termios;
        writeFromLower: (arg: number[] | string) => void;
        writeFromUpper: (arg: number[] | string) => void;
    }
}

declare module 'xterm-pty/termios' {
    export const ISTRIP = 32;
    export const INLCR = 64;
    export const IGNCR = 128;
    export const ICRNL = 256;
    export const IUCLC = 512;
    export const IXON = 1024;
    export const IXANY = 2048;
    export const IMAXBEL = 8192;
    export const IUTF8 = 16384;
    export const OPOST = 1;
    export const OLCUC = 2;
    export const ONLCR = 4;
    export const OCRNL = 8;
    export const ONOCR = 16;
    export const ONLRET = 32;
    export const TABDLY = 6144;
    export const XTABS = 6144;
    export const ISIG = 1;
    export const ICANON = 2;
    export const ECHO = 8;
    export const ECHOE = 16;
    export const ECHOK = 32;
    export const ECHONL = 64;
    export const NOFLSH = 128;
    export const ECHOCTL = 512;
    export const ECHOPRT = 1024;
    export const ECHOKE = 2048;
    export const IEXTEN = 32768;
    export const VINTR = 0;
    export const VQUIT = 1;
    export const VERASE = 2;
    export const VKILL = 3;
    export const VEOF = 4;
    export const VTIME = 5;
    export const VMIN = 6;
    export const VSWTCH = 7;
    export const VSTART = 8;
    export const VSTOP = 9;
    export const VSUSP = 10;
    export const VEOL = 11;
    export const VREPRINT = 12;
    export const VDISCARD = 13;
    export const VWERASE = 14;
    export const VLNEXT = 15;
    export const VEOL2 = 16;
    export class Termios {
        readonly iflag: number;
        readonly oflag: number;
        readonly cflag: number;
        readonly lflag: number;
        readonly cc: number[];
        constructor(iflag: number, oflag: number, cflag: number, lflag: number, cc: number[]);
        readonly ISTRIP_P: boolean;
        readonly INLCR_P: boolean;
        readonly IGNCR_P: boolean;
        readonly ICRNL_P: boolean;
        readonly IUCLC_P: boolean;
        readonly IXON_P: boolean;
        readonly IXANY_P: boolean;
        readonly IUTF8_P: boolean;
        readonly OPOST_P: boolean;
        readonly OLCUC_P: boolean;
        readonly ONLCR_P: boolean;
        readonly OCRNL_P: boolean;
        readonly ONOCR_P: boolean;
        readonly ONLRET_P: boolean;
        readonly TABDLY_XTABS_P: boolean;
        readonly ISIG_P: boolean;
        readonly ICANON_P: boolean;
        readonly ECHO_P: boolean;
        readonly ECHOE_P: boolean;
        readonly ECHOK_P: boolean;
        readonly ECHONL_P: boolean;
        readonly NOFLSH_P: boolean;
        readonly ECHOCTL_P: boolean;
        readonly ECHOPRT_P: boolean;
        readonly ECHOKE_P: boolean;
        readonly IEXTEN_P: boolean;
        readonly INTR_V: number;
        readonly QUIT_V: number;
        readonly ERASE_V: number;
        readonly KILL_V: number;
        readonly EOF_V: number;
        readonly TIME_V: number;
        readonly MIN_V: number;
        readonly SWTCH_V: number;
        readonly START_V: number;
        readonly STOP_V: number;
        readonly SUSP_V: number;
        readonly EOL_V: number;
        readonly REPRINT_V: number;
        readonly DISCARD_V: number;
        readonly WERASE_V: number;
        readonly LNEXT_V: number;
        readonly EOL2_V: number;
        clone(): Termios;
    }
    export const defaultTermios: Termios;
    export const termiosToData: (termios: Termios) => number[];
    export const dataToTermios: (data: number[]) => Termios;
}

declare module 'xterm-pty/utils' {
    export const BS = 8;
    export const TAB = 9;
    export const NL = 10;
    export const CR = 13;
    export const SP = 32;
    export const isalnum: (c: number) => boolean;
    export const iscntrl: (c: number) => boolean;
    export const isUtf8ContinuationByte: (c: number) => boolean;
    export const tolower: (c: number) => number;
    export const toupper: (c: number) => number;
    export const utf8BytesToString: (buf: number[]) => [string, number[]];
    export const stringToUtf8Bytes: (str: string) => number[];
}

declare module 'xterm-pty/pty' {
    import { Terminal, ITerminalAddon } from "xterm";
    import { LineDiscipline } from "xterm-pty/lineDiscipline";
    import { Termios } from "xterm-pty/termios";
    export type Signal = "SIGINT" | "SIGQUIT" | "SIGTSTP" | "SIGWINCH";
    class Master implements ITerminalAddon {
        readonly onWrite: import("./eventEmitter").Event<[Uint8Array, () => void]>;
        constructor(ldisc: LineDiscipline, slave: Slave);
        activate(xterm: Terminal): void;
        dispose(): void;
    }
    export class Slave {
        readonly onReadable: import("./eventEmitter").Event<void>;
        readonly onWritable: import("./eventEmitter").Event<void>;
        readonly onSignal: import("./eventEmitter").Event<Signal>;
        constructor(ldisc: LineDiscipline);
        initFromMaster(): {
            notifyWritable: () => void;
            notifyResize: (rows: number, cols: number) => void;
        };
        get readable(): boolean;
        read(length?: number): number[];
        get writable(): boolean;
        write(arg: string | number[]): void;
        ioctl(req: "TCGETS"): Termios;
        ioctl(req: "TCSETS", arg: Termios): void;
        ioctl(req: "TIOCGWINSZ"): [number, number];
    }
    export const openpty: () => {
        master: Master;
        slave: Slave;
    };
    export {};
}

declare module 'xterm-pty/ttyServer' {
    import { Slave } from "xterm-pty/pty";
    export type TtyRequest = {
        ttyRequestType: "read";
        length: number;
    } | {
        ttyRequestType: "write";
        buf: number[];
    } | {
        ttyRequestType: "input";
    } | {
        ttyRequestType: "output";
        char: number;
    } | {
        ttyRequestType: "poll";
        timeout: number;
    } | {
        ttyRequestType: "tcgets";
    } | {
        ttyRequestType: "tcsets";
        data: number[];
    } | {
        ttyRequestType: "tiocgwinsz";
    };
    export class TtyServer {
        ack(): void;
        fromWorkerBuf: number[];
        toWorkerBuf: number[];
        constructor(slave: Slave);
        feedToWorker(length: number): void;
        feedFromWorker(): void;
        waitForReadable(timeout: number): void;
        start(worker: Worker, callback?: (ev: MessageEvent<any>) => void): void;
        stop(): void;
    }
}

declare module 'xterm-pty/eventEmitter' {
    type Listener<T> = (arg: T) => void;
    export type Event<T> = (listener: Listener<T>) => {
        dispose: () => void;
    };
    export class EventEmitter<T> {
        get register(): Event<T>;
        fire(arg: T): void;
    }
    export {};
}

